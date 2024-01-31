/* global BigInt */
"use client";

import React, { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  Address,
  UseContractWriteConfig,
} from "wagmi";
import toast, { Toaster } from "react-hot-toast";
import isEmpty from "lodash.isempty";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import abi from "@/contracts/staking_contract_abi.json";

export default function Page() {
    const [withdrawalAmount, setWithdrawalAmount] = useState(0 as number);
    const [walletAddress, setWalletAddress] = useState<Address | null>(null);
    const account = useAccount();

    const {
        data: withdrawalData,
        isSuccess: isWithdrawSuccessful,
        write: withdrawalWrite,
        isError: isWithdrawError,
        error: withdrawalError,
    } = useContractWrite({
        address: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as Address,
        abi: abi,
        functionName: 'withdraw',
    });

    useEffect(() => {
        if (isWithdrawSuccessful) {
            toast.success("Withdrawal successful!");
            toast.success(<span>Verify your transaction on {' '} 
                <a
                    href={`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${withdrawalData?.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-800"
                >
                    {`${process.env.NEXT_PUBLIC_POLYGONSCAN_URL}/tx/${withdrawalData?.hash}`}
                </a>
                </span>
            )
        }
    }, [isWithdrawSuccessful, withdrawalData]);

    useEffect(() => {
        if (isWithdrawError) {
            if (withdrawalError?.message)
                toast.error(`Withdrawal failed. ${withdrawalError.message}`);
        }
    }, [isWithdrawError, withdrawalError]);

    useEffect(() => {
        if (!isEmpty(account)) {
            setWalletAddress(account?.address as Address);
        }
    }, [account]);

    const withdrawPION = async () => {
        if (isEmpty(walletAddress) || walletAddress === undefined) {
            toast.error("Please connect your wallet");
        }
        else if (withdrawalAmount <= 0) {
            toast.error("Please enter a valid amount to stake");
        }
        else {
            withdrawalWrite({
                args: [withdrawalAmount * 
						Number(process.env.NEXT_PUBLIC_TOKEN_DECIMAL ?? 0)],
                from: walletAddress,
            } as UseContractWriteConfig);
        }
    }

  return (
    <div className="grow relative h-screen overflow-hidden">
      <Toaster />
      <div key="1" className="max-w-7xl mx-auto p-8 flex-grow">
        <div className="bg-white flex min-h-screen justify-center items-center p-8">
          <div className="max-w-lg mx-auto p-12 bg-white-800 rounded-2xl shadow-2xl">
            <div className="text-center text-grey-200">
              <h2 className="text-3xl font-bold mb-4">
                Withdraw
                <span className="text-red-800"> $PION</span>
				{' '}from Pool
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
                  value={withdrawalAmount}
				  onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
                />
                <label
                  className="text-2sm font-medium mb-2 p-2"
                  htmlFor="amount"
                >
                  PION
                </label>
              </div>
              <Button
                className="w-full bg-red-800 px-8 py-4 text-2sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-black-300 rounded"
                onClick={() => withdrawPION()}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
