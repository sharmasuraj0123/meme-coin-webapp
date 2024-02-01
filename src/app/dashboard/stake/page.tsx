/* global BigInt */
"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  Address,
  UseContractWriteConfig,
} from "wagmi";
import { waitForTransaction } from "wagmi/actions";
import toast, { Toaster } from "react-hot-toast";
import isEmpty from "lodash.isempty";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import staking_contract_abi from "@/contracts/staking_contract_abi.json";
import pionTokenAbi from "@/contracts/pion_token_abi.json";

import { MAX_UINT256 } from "@/constants/constants";

const chainEnv = process.env.NEXT_PUBLIC_CHAIN_ENV;

export default function Page() {
  const [stakedValue, setStakedValue] = useState(0 as number);
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);
  const [contractApprovalAmount, setContractApprovalAmount] = useState(
    BigInt(0)
  );
  const account = useAccount();

  const {
    data: approvalData,
    isSuccess: approvalSuccess,
    isError: isApprovalError,
    error: approvalError,
    write: approvalWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_PION_TOKEN_CONTRACT_ADDRESS as Address,
    abi: pionTokenAbi,
    functionName: "approve",
  });

  const {
    data: supplyData,
    isSuccess: isSupplySuccessful,
    isError: isSupplyError,
    error: supplyError,
    write: supplyWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as Address,
    abi: staking_contract_abi,
    functionName: "supply",
  });

  const {
    data: allowanceAmount,
    isSuccess: isAllowanceSuccessful,
    refetch: refetchAllowance,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_PION_TOKEN_CONTRACT_ADDRESS as Address,
    abi: pionTokenAbi,
    functionName: "allowance",
    args: [walletAddress, process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS],
  });

  useEffect(() => {
    if (isSupplySuccessful) {
      toast.success("Staking successful!");
      toast.custom(
        <div className="bg-white p-4 rounded-lg shadow-md flex align-items-center">
          <span>
            Verify your transaction on <br />
            <a
              href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${supplyData?.hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-800"
            >
              {`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${supplyData?.hash}`}
            </a>
          </span>
        </div>
      );
    }
  }, [isSupplySuccessful, supplyData]);

  useEffect(() => {
    if (isSupplyError) {
      if (supplyError?.message) {
        toast.error(
          `There was an error in the supply.\n ${supplyError.message}`
        );
      }
    }
  }, [isSupplyError, supplyError]);

  useEffect(() => {
    if (isApprovalError) {
      if (approvalError?.message)
        toast.error(
          `There was an error in the approval. ${approvalError.message}`
        );
    }
  }, [isApprovalError, approvalError]);

  useEffect(() => {
    if (!isEmpty(account)) {
      setWalletAddress(account?.address as Address);
    }
  }, [account]);

  useEffect(() => {
    if (
      approvalSuccess === true &&
      walletAddress !== undefined &&
      stakedValue > 0
    ) {
      waitForTransaction({ hash: approvalData?.hash as `0x${string}` }).then(
        (_res) => {
          refetchAllowance().then((res) => {
            setContractApprovalAmount(res.data as bigint);
          });
          toast.success("Contract is approved");
          supplyWrite({
            args: [
              stakedValue * Number(process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0),
            ],
            from: walletAddress,
          } as UseContractWriteConfig);
        }
      );
    }
  }, [approvalSuccess, walletAddress, stakedValue]);

  const stakePion = () => {
    if (isEmpty(walletAddress) || walletAddress === undefined) {
      toast.error("Please connect your wallet");
    } else if (stakedValue <= 0) {
      toast.error("Please enter a valid amount to stake");
    } else {
      const stakedValueBigInt = BigInt(
        stakedValue * Number(process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0)
      );
      if (BigInt(contractApprovalAmount) >= stakedValueBigInt) {
        supplyWrite({
          args: [
            stakedValue * Number(process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0),
          ],
          from: walletAddress,
        } as UseContractWriteConfig);
      } else {
        approvalWrite({
          args: [process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS, MAX_UINT256],
          from: walletAddress,
        } as UseContractWriteConfig);
      }
    }
  };

  useEffect(() => {
    if (isAllowanceSuccessful) {
      setContractApprovalAmount(allowanceAmount as bigint);
    }
  }, [allowanceAmount, isAllowanceSuccessful]);

  return (
    <div className="grow relative h-screen overflow-hidden">
      <Toaster />
      <div key="1" className="max-w-7xl mx-auto p-8 flex-grow">
        <div className="bg-white flex min-h-screen justify-center items-center p-8">
          <div className="max-w-lg mx-auto p-12 bg-white-800 rounded-2xl shadow-2xl">
            <div className="text-center text-grey-200">
              <h2 className="text-4xl font-bold mb-4">
                Stake
                {chainEnv === "testnet" && (
                  <span className="text-red-800"> $PION-DUBAI</span>
                )}
                {chainEnv === "mainnet" && (
                  <span className="text-red-800"> $PION</span>
                )}{" "}
                from Pool
              </h2>
              <div className="mb-8 flex items-center justify-between">
                <label
                  className="text-2sm font-medium mb-2 p-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <Input
                  className="w-3/5 rounded-2xl shadow-2xl placeholder-gray-400 text-black text-2xl ml-auto text-right"
                  placeholder="0"
                  type="number"
                  min="0"
                  value={stakedValue}
                  onChange={(e) => setStakedValue(parseFloat(e.target.value))}
                />
                <label
                  className="text-2sm font-medium mb-2 p-2"
                  htmlFor="amount"
                >
                  {chainEnv === "testnet" && (
                    <span className="text-red-800"> $PION-DUBAI</span>
                  )}
                  {chainEnv === "mainnet" && (
                    <span className="text-red-800"> $PION</span>
                  )}
                </label>
              </div>
              <Button
                className="w-full bg-red-800 px-8 py-4 text-2sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-black-300 rounded"
                onClick={() => stakePion()}
              >
                Stake Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
