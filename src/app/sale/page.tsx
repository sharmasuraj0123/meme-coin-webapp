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
import { redirect } from "next/navigation";
import token_sale_abi from "@/contracts/token_sale_abi.json";
import usdtTokenAbi from "@/contracts/usdt_token_abi.json";

import { MAX_UINT256 } from "@/constants/constants";
import { MINT_1K_USDT } from "@/constants/constants";
import { useLoading } from "@/context/Loading";

const chainEnv = process.env.NEXT_PUBLIC_CHAIN_ENV;

export default function Page() {
  const { setLoading } = useLoading();
  const [buyTokenValue, setBuyTokenValue] = useState(0 as number);
  const [contractApprovalAmount, setContractApprovalAmount] = useState(
    BigInt(0)
  );
  const [walletAddress, setWalletAddress] = useState<Address | null>(null);
  const account = useAccount();

  const {
    data: allowanceAmount,
    isSuccess: isAllowanceSuccessful,
    refetch: refetchAllowance,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_USDT_TOKEN_CONTRACT_ADDRESS as Address,
    abi: usdtTokenAbi,
    functionName: "allowance",
    args: [walletAddress, process.env.NEXT_PUBLIC_TOKEN_SALE_CONTRACT_ADDRESS],
  });

  const {
    data: approvalData,
    isSuccess: approvalSuccess,
    isError: isApprovalError,
    error: approvalError,
    write: approvalWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_USDT_TOKEN_CONTRACT_ADDRESS as Address,
    abi: usdtTokenAbi,
    functionName: "approve",
  });

  const {
    data: mintMockUsdtData,
    isLoading: isMintMockUsdtLoading,
    isSuccess: isMintMockUsdtSuccess,
    isError: isMintMockUsdtError,
    error: mintMockUsdtError,
    write: minMockUsdtWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_USDT_TOKEN_CONTRACT_ADDRESS as Address,
    abi: usdtTokenAbi,
    functionName: "mint",
  });

  const {
    data: buyPionData,
    isSuccess: isBuyPionSuccessful,
    isLoading: isBuyPionLoading,
    isError: isBuyPionError,
    error: buyPionError,
    write: buyPionWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_TOKEN_SALE_CONTRACT_ADDRESS as Address,
    abi: token_sale_abi,
    functionName: "buyPion",
  });

  useEffect(() => {
    if (isMintMockUsdtLoading) {
      setLoading(true, "Mint in progress...");
    }
  }, [isMintMockUsdtLoading]);

  useEffect(() => {
    if (isBuyPionLoading) {
      setLoading(true, "Buying in progress...");
    }
  }, [isBuyPionLoading]);

  useEffect(() => {
    if (isMintMockUsdtSuccess) {
      waitForTransaction({
        hash: mintMockUsdtData?.hash as `0x${string}`,
      }).then((_res) => {
        setLoading(false);
        toast.success("Mint successful!");
        toast.custom(
          <div className="bg-white p-4 rounded-lg shadow-md flex align-items-center">
            <span>
              Verify your transaction on <br />
              <a
                href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${mintMockUsdtData?.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-800"
              >
                {`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${mintMockUsdtData?.hash}`}
              </a>
            </span>
          </div>
        );
      });
    }
  }, [isMintMockUsdtSuccess, mintMockUsdtData]);

  useEffect(() => {
    if (isMintMockUsdtError) {
      if (mintMockUsdtError?.message)
        toast.error(
          `There was an error in the mint.\n ${mintMockUsdtError?.message}`
        );
      else
        toast.error(
          `There was an error in the mint.\n ${mintMockUsdtError?.message}`
        );
    }
  }, [isMintMockUsdtError, mintMockUsdtError]);

  useEffect(() => {
    if (isBuyPionSuccessful) {
      waitForTransaction({
        hash: buyPionData?.hash as `0x${string}`,
      }).then((_res) => {
        setLoading(false);
        toast.success("Buying successful!");
        toast.custom(
          <div className="bg-white p-4 rounded-lg shadow-md flex align-items-center">
            <span>
              Verify your transaction on <br />
              <a
                href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${buyPionData?.hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-800"
              >
                {`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${buyPionData?.hash}`}
              </a>
            </span>
          </div>
        );
      });
    }
  }, [isBuyPionSuccessful, buyPionData]);

  useEffect(() => {
    if (isBuyPionError) {
      if (buyPionError?.message)
        toast.error(
          `There was an error in the exchange.\n ${buyPionError?.message}`
        );
      else
        toast.error(
          `There was an error in the exchange.\n ${buyPionError?.message}`
        );
    }
  }, [isBuyPionError, buyPionError]);

  useEffect(() => {
    if (isApprovalError) {
      if (approvalError?.message)
        toast.error(
          `There was an error in the approval. ${approvalError?.message}`
        );
    }
  }, [isApprovalError, approvalError]);

  useEffect(() => {
    if (!isEmpty(account)) {
      setWalletAddress(account?.address as Address);
    }
  }, [account]);

  useEffect(() => {
    if (isAllowanceSuccessful) {
      setContractApprovalAmount(allowanceAmount as bigint);
    }
  }, [isAllowanceSuccessful, allowanceAmount]);

  useEffect(() => {
    if (approvalSuccess) {
      waitForTransaction({ hash: approvalData?.hash as `0x${string}` }).then(
        (res) => {
          refetchAllowance().then((response) => {
            setContractApprovalAmount(response.data as bigint);
          });
          toast.success("Contract is approved");
          buyPionWrite({
            args: [
              buyTokenValue *
                Number(process.env.NEXT_PUBLIC_USDT_TOKEN_DECIMAL ?? 0),
            ],
            from: walletAddress,
          } as UseContractWriteConfig);
        }
      );
    }
  }, [approvalSuccess, walletAddress, buyTokenValue]);

  const approveUSDT = () => {
    if (isEmpty(walletAddress) || walletAddress === undefined) {
      toast.error("Please connect your wallet");
    } else if (buyTokenValue < 0.01) {
      toast.error(
        "Please enter a valid amount to Buy! Minimum amount is 0.01 USDT"
      );
    } else if (
      BigInt(contractApprovalAmount) >=
      BigInt(
        buyTokenValue * Number(process.env.NEXT_PUBLIC_USDT_TOKEN_DECIMAL ?? 0)
      )
    ) {
      buyPionWrite({
        args: [
          buyTokenValue *
            Number(process.env.NEXT_PUBLIC_USDT_TOKEN_DECIMAL ?? 0),
        ],
        from: walletAddress,
      } as UseContractWriteConfig);
    } else {
      approvalWrite({
        args: [
          process.env.NEXT_PUBLIC_TOKEN_SALE_CONTRACT_ADDRESS,
          MAX_UINT256,
        ],
        from: walletAddress,
      } as UseContractWriteConfig);
    }
  };

  const mintMockUSDT = () => {
    if (isEmpty(walletAddress) || walletAddress === undefined) {
      toast.error("Please connect your wallet");
    } else {
      minMockUsdtWrite({
        args: [walletAddress, MINT_1K_USDT],
        from: walletAddress,
      } as UseContractWriteConfig);
    }
  };

  return (
    <div className="grow relative h-screen overflow-hidden">
      <Toaster />
      <div key="1" className="max-w-7xl mx-auto p-8 flex-grow">
        <div className="bg-white flex min-h-screen justify-center items-center p-8">
          <div className="max-w-lg mx-auto p-12 bg-white-800 rounded-2xl shadow-2xl">
            <div className="text-center text-grey-200">
              <h2 className="text-4xl font-bold mb-4">
                Buy
                {chainEnv === "testnet" && (
                  <span className="text-red-800"> $PION-DUBAI</span>
                )}
                {chainEnv === "mainnet" && (
                  <span className="text-red-800"> $PION</span>
                )}
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
                  value={buyTokenValue}
                  onChange={(e) => setBuyTokenValue(parseFloat(e.target.value))}
                />
                <label
                  className="text-2sm font-medium mb-2 p-2"
                  htmlFor="amount"
                >
                  USDT
                </label>
              </div>
              <div className="mb-8 flex items-center justify-between">
                <label className="text-2sm font-medium p-2" htmlFor="amount">
                  You will receive
                </label>
                <label className="text-2sm font-bold mb-2 p-2 text-red-800 text-lg">
                  {buyTokenValue * 100} $PION
                </label>
              </div>
              <div className="pb-4">
                <label className="text-lg font-medium p-4 text-grey-100 mt-8">
                  1 <span className="text-red-800">$PION</span> = 0.01 USDT
                </label>
                {chainEnv === "testnet" && (
                  <Button
                    className="mt-4 ring-2 text-red-800 ring-red-800 rounded-2xl bg-transparent"
                    variant="link"
                    onClick={() => mintMockUSDT()}
                  >
                    Mint Mock USDT
                  </Button>
                )}
              </div>
              <Button
                className="w-full bg-red-800 px-8 py-4 text-2sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-black-300 rounded"
                onClick={() => approveUSDT()}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
