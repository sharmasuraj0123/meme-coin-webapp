import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardContent, Card } from "@/components/ui/card"
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"

import { StakeIcon } from "@/components/StakeIcon";
import { UnstakeIcon } from "@/components/UnstakeIcon";

export default function Page() {
    return (
      <div className="max-w-7xl mx-auto p-8 flex-grow">
      <div className="flex flex-col relative z-10 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl lg:px-0 px-8 mx-auto w-full py-5 max-lg:flex-wrap">
        <div className="flex justify-between items-center pb-8 mb-8 border-b-2 border-white/10">
          <div className="grow font-bold xl:text-3xl lg:text-2xl md:text-xl text-lg text-red-800">Your Account</div>
          <div className="inline-flex items-center gap-3">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-red-800 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
              to="/withdraw"
            >
              Unstake
              <UnstakeIcon/>
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-red-800 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
              to="/launch"
            >
              Stake
              <StakeIcon/>
            </Link>
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
                        <Button className="text-sm p-1 rounded-full" variant="ghost">
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
              <p className="text-2xl font-semibold text-black">1,109.41 PION</p>
            </CardContent>
          </Card>
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Your Stake</CardTitle>
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-2">15 %</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="text-sm p-1 rounded-full" variant="ghost">
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
              <p className="text-2xl font-semibold text-black">2,090.41 PION</p>
            </CardContent>
          </Card>
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Profit Timer</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="text-sm p-1 rounded-full" variant="ghost">
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
              <p className="text-2xl font-semibold text-black">2:00:00 seconds</p>
            </CardContent>
          </Card>
        </div>
        <h2
          className="text-xl font-semibold text-red-800 mb-2 p-4 text-2xl"
          style={{
            color: "#0f172a",
          }}
        >
          Transactions in Queue
        </h2>
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Profit</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="text-sm p-1 rounded-full" variant="ghost">
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
          </Card>
          <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between text-gray-300">
                <CardTitle>Stake</CardTitle>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button className="text-sm p-1 rounded-full" variant="ghost">
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
              <p className="text-2xl font-semibold text-black">90 PION</p>
            </CardContent>
          </Card>
        </div>
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
                    % Share of Pool
                  </th>
                  <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="group/history invest shadow-lg">
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    20-12-2022
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    06x90a...521
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-green-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    stake
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    0.5%
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    5,000
                  </td>
                </tr>
                <tr className="group/history withdraw shadow-lg">
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    20-12-2022
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    06x90a...521
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    unstake
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    0.5%
                  </td>
                  <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                    5,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      );
  }
