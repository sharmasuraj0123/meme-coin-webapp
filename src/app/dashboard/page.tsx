"use client";

import { getPublicClient } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { orderBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Address, deserialize, useAccount, useContractReads } from "wagmi";

import { Button } from "@/components/ui/button";
import { CardTitle, CardContent, Card } from "@/components/ui/card";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import staking_contract_abi from "@/contracts/staking_contract_abi.json";
import pion_token_abi from "@/contracts/pion_token_abi.json";

import Unstake from "./unstake/Unstake";
import Stake from "./stake/Stake";
import { Abi, Log } from "viem";

type getAmountBySupplier = {
  balanceAmount: string;
  transferAmount: string;
};

const TOKEN_DECIMAL = new BigNumber(process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0);

export default function Page() {
  const publicClient = getPublicClient();
  const { address: userWalletAddress } = useAccount();
  const [stakedAmount, setStakedAmount] = useState<BigNumber>(BigNumber(0));
  const [transferAmount, setTransferAmount] = useState<BigNumber>(BigNumber(0));
  const [walletBalance, setWalletBalance] = useState<BigNumber>(BigNumber(0));
  const [percentageOwned, setPercentageOwned] = useState<BigNumber>(
    BigNumber(0)
  );
  const [totalTokensSupplied, setTotalTokensSupplied] = useState<BigNumber>(
    BigNumber(0)
  );
  const [logs, setLogs] = useState<Log[]>();
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const config = {
    abi: staking_contract_abi as Abi,
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as Address,
  };

  const { data: stakingPool } = useContractReads({
    contracts: [
      {
        ...config,
        functionName: "getAmountBySupplier",
        args: [userWalletAddress as Address],
      },
      {
        ...config,
        functionName: "totalTokensSupplied",
      },
      {
        abi: pion_token_abi as Abi,
        address: process.env.NEXT_PUBLIC_PION_TOKEN_CONTRACT_ADDRESS as Address,
        functionName: "balanceOf",
        args: [userWalletAddress as Address],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().utc();

      let nextEvent;
      if (process.env.NEXT_PUBLIC_CHAIN_ENV === "testnet") {
        if (now.hour() < 12) {
          nextEvent = now.clone().startOf("day").add(12, "hours");
        } else {
          nextEvent = now.clone().add(1, "days").startOf("day");
        }
      } else if (process.env.NEXT_PUBLIC_CHAIN_ENV === "mainnet") {
        nextEvent = now.clone().endOf("week");
      } else {
        nextEvent = now.clone();
      }

      const duration = nextEvent.diff(now);

      setTimeLeft(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userWalletAddress) {
      if (stakingPool) {
        console.dir(stakingPool, { depth: null });

        const percentage = BigNumber(
          (stakingPool[0]?.result as getAmountBySupplier)["balanceAmount"]
        )
          .div(stakingPool[1]?.result as string)
          .times(100);

        const stakedAmount = BigNumber(
          (stakingPool[0]?.result as getAmountBySupplier)["balanceAmount"]
        ).dividedBy(TOKEN_DECIMAL);

        const totalTokensSupplied = BigNumber(
          stakingPool[1]?.result as string
        ).dividedBy(TOKEN_DECIMAL);

        const transferAmount = BigNumber(
          (stakingPool[0]?.result as getAmountBySupplier)["transferAmount"]
        ).dividedBy(TOKEN_DECIMAL);

        const walletBalance = BigNumber(
          stakingPool[2]?.result as string
        ).dividedBy(TOKEN_DECIMAL);

        setStakedAmount(stakedAmount);
        setTransferAmount(transferAmount);
        setPercentageOwned(percentage);
        setWalletBalance(walletBalance);
        setTotalTokensSupplied(totalTokensSupplied);
      }
    } else {
      setStakedAmount(BigNumber(0));
      setTransferAmount(BigNumber(0));
      setPercentageOwned(BigNumber(0));
    }
  }, [stakingPool, userWalletAddress]);

  useEffect(() => {
    async function getLogs() {
      const supplyLogs = (await publicClient.getContractEvents({
        ...config,
        eventName: "SupplyRequest",
        args: {
          supplier: userWalletAddress,
        },
        fromBlock: "earliest",
        toBlock: "latest",
      })) as Log[];

      const withdrawLogs = (await publicClient.getContractEvents({
        ...config,
        eventName: "WithdrawRequest",
        args: {
          supplier: userWalletAddress,
        },
        fromBlock: "earliest",
        toBlock: "latest",
      })) as Log[];

      const sortedLogs = orderBy(
        [...supplyLogs, ...withdrawLogs],
        (log: Log) => log?.args?.timestamp,
        "desc"
      );
      console.log("Sorted Logs are ");
      console.dir(sortedLogs, { depth: null });
      setLogs(sortedLogs);
    }

    if (userWalletAddress) getLogs();
  }, [userWalletAddress]);

  const formattedTimeLeft = moment.duration(timeLeft);

  return (
    <div className="max-w-7xl mx-auto p-8 flex-grow">
      <div className="flex flex-col relative z-10 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl lg:px-0 px-8 mx-auto w-full py-5 max-lg:flex-wrap">
        <div className="flex justify-between items-center pb-8 mb-8 border-b-2 border-white/10">
          <div className="grow font-bold xl:text-3xl lg:text-2xl md:text-xl text-lg text-red-800">
            Your Account
          </div>
          <div className="inline-flex items-center gap-3">
            <Unstake />
            <Stake />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Wallet Balance</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="text-sm p-1 rounded-full"
                          variant="ghost"
                        >
                          ?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of Ownership</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-2xl font-semibold text-black">
                {walletBalance.toFixed(2).toString()} PION
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Your Stake</CardTitle>
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-2">
                    {percentageOwned.toFixed(2).toString()} %
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="text-sm p-1 rounded-full"
                          variant="ghost"
                        >
                          ?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of Ownership</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-2xl font-semibold text-black">
                {stakedAmount.toFixed(2).toString()} PION
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Next Profit Unlock</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="text-sm p-1 rounded-full"
                          variant="ghost"
                        >
                          ?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of Ownership</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="grid grid-cols-4 text-center text-2xl font-semibold text-black">
                <div>
                  <p>{formattedTimeLeft.days()}</p>
                  <p className="text-sm text-gray-500">Days</p>
                </div>
                <div>
                  <p>{formattedTimeLeft.hours()}</p>
                  <p className="text-sm text-gray-500">Hours</p>
                </div>
                <div>
                  <p>{formattedTimeLeft.minutes()}</p>
                  <p className="text-sm text-gray-500">Mins</p>
                </div>
                <div>
                  <p>{formattedTimeLeft.seconds()}</p>
                  <p className="text-sm text-gray-500">Secs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {!transferAmount.isEqualTo(0) && (
          <>
            <h2
              className="text-xl font-semibold text-red-800 mb-2 p-4 text-2xl"
              style={{
                color: "#0f172a",
              }}
            >
              Transactions in Queue
            </h2>
            <div className="grid grid-cols-2 gap-4 w-1/2">
              {/* <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Profit</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="text-sm p-1 rounded-full"
                          variant="ghost"
                        >
                          ?
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Percentage of Ownership</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-2xl font-semibold text-black">109.01 PION</p>
            </CardContent>
          </Card> */}
              <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
                <CardContent>
                  <div className="flex items-center justify-between text-gray-300">
                    <CardTitle>
                      {transferAmount.isGreaterThan(0) ? `Stake` : `Unstake`}
                    </CardTitle>
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              className="text-sm p-1 rounded-full"
                              variant="ghost"
                            >
                              ?
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Transaction currently in queue</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <p className="text-2xl font-semibold text-black">
                    {transferAmount.toFixed(2).toString()} PION
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
        <div className="grow font-bold xl:text-3xl lg:text-2xl md:text-xl text-lg text-red-800 md:pt-8 pt-0">
          Transaction History
        </div>
        <div className="grid grid-cols-1 gap-8 pt-4">
          <div className="flex flex-col overflow-x-auto">
            <table className="table-auto hover:table-fixed border-separate border-spacing-y-4 md:text-base text-sm">
              <thead>
                <tr>
                  <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                    Date/Time
                  </th>
                  <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                    Transaction Hash
                  </th>
                  <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                    Action
                  </th>
                  <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs &&
                  logs.map((log, index) => (
                    <tr
                      className="group/history invest shadow-lg"
                      key={index}
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${log.transactionHash}`,
                          "_blank"
                        )
                      }
                    >
                      <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                        {moment
                          .unix(deserialize(log.args?.timestamp))
                          .format("MM-DD-YYYY")}
                      </td>
                      <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                        {`${log.transactionHash.slice(
                          0,
                          15
                        )}...${log.transactionHash.slice(-5)}`}
                      </td>
                      {log.eventName === `SupplyRequest` ? (
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-green-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          Stake
                        </td>
                      ) : (
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          Unstake
                        </td>
                      )}
                      <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                        {BigNumber(log.args.pionTokens)
                          .dividedBy(
                            BigNumber(
                              process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0
                            )
                          )
                          .toFixed(2)
                          .toString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
