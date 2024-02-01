import { ActivityIcon } from "@/components/ActivityIcon";
import { LayoutDashboardIcon } from "@/components/LayoutDashboardIcon";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import { StoreIcon } from "@/components/StoreIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Page() {
  return (
    <div className="bg-white flex">
      <div className="max-w-7xl mx-auto p-8 flex-grow">
        <div className="flex flex-col relative z-10 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl lg:px-0 px-8 mx-auto w-full py-5 max-lg:flex-wrap">
          <div className="flex justify-between items-center pb-8 mb-8 border-b-2 border-white/10">
            <div className="grow font-bold xl:text-3xl lg:text-2xl md:text-xl text-lg text-red-800">
              Pool Performance
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
              <CardContent>
                <div className="flex items-center justify-between text-gray-300">
                  <CardTitle>Bankroll Balance</CardTitle>
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
                          <p>Current Balance of the bankroll Wallet</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-black">
                  1,109,410 USDT
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
              <CardContent>
                <div className="flex items-center justify-between text-gray-300">
                  <CardTitle>Amount Borrowed</CardTitle>
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
                          <p>Amount Currently borrowed from the pool</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-black">
                  900,000 USDT
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
              <CardContent>
                <div className="flex items-center justify-between text-gray-300">
                  <CardTitle>Total Credit</CardTitle>
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
                          <p>Maximum Amount Casino can borrow</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <p className="text-2xl font-semibold text-black">
                  2,000,000 USDT
                </p>
              </CardContent>
            </Card>
          </div>
          <h2
            className="text-xl font-semibold text-red-800 mb-2 p-4 text-2xl"
            style={{
              color: "#0f172a",
            }}
          >
            Casino Ledger
          </h2>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
              <CardContent className="flex justify-between items-center font-semibold">
                <h2 className="text-xl font-semibold text-gray-300 mb-2 p-4 text-2xl">
                  Current Cycle
                </h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Total Wagered
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        10,000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Total Exposure
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        3000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Current Profit
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        1000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Potential Profit
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        4000 USDT
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="col-span-1 bg-white text-[#fcecda] shadow-lg">
              <CardContent className="flex justify-between items-center font-semibold">
                <h2 className="text-xl font-semibold text-gray-300 mb-2 p-4 text-2xl">
                  Overall
                </h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Total Wagered
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        900,000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Total Exposure
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        3000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Current Profit
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        10000 USDT
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-300 font-semibold">
                        Potential Profit
                      </TableCell>
                      <TableCell className="text-black font-semibold">
                        4000 USDT
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 pt-4">
            <Collapsible className="space-y-2">
              <div className="flex items-center justify-between space-x-4 px-4">
                <CollapsibleTrigger asChild>
                  <Button
                    className="w-full flex justify-start items-left text-grey-300"
                    variant="ghost"
                  >
                    <h2 className="text-xl font-semibold">
                      View Complete History
                    </h2>
                    <ChevronDownIcon className="h-12 w-8 ml-2 text-grey-300" />
                    <span className="sr-only text-grey-300">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="flex flex-col overflow-x-auto">
                <CollapsibleContent className="space-y-2">
                  <table className="table-auto hover:table-fixed border-separate border-spacing-y-4 md:text-base text-sm w-full">
                    <thead>
                      <tr>
                        <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                          Date/Time
                        </th>
                        <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                          Total Wagered
                        </th>
                        <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                          Total Exposure
                        </th>
                        <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                          Current Profit
                        </th>
                        <th className="text-gray-800 md:px-5 px-3 md:font-semibold font-normal text-left first:rounded-l-xl last:rounded-r-xl text-nowrap">
                          Potential Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="group/history invest shadow-lg">
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          20-12-2022
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          1000 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          500 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl text-green-400">
                          900 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          400 USDT
                        </td>
                      </tr>
                      <tr className="group/history invest shadow-lg">
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          20-11-2022
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          1000 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          500 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl text-green-400">
                          900 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          400 USDT
                        </td>
                      </tr>
                      <tr className="group/history invest shadow-lg">
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          20-10-2022
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          1000 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          500 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl text-red-400">
                          - 900 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          400 USDT
                        </td>
                      </tr>
                      <tr className="group/history invest shadow-lg">
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          20-09-2022
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          1000 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-red-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          500 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl text-green-400">
                          900 USDT
                        </td>
                        <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                          400 USDT
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
          <div className="grow font-bold xl:text-3xl lg:text-2xl md:text-xl text-lg text-red-800 md:pt-8 pt-0">
            Profit Settlement History
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
                      P/L
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
                      profit
                    </td>
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      3,000
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
                      loss
                    </td>
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      1,000
                    </td>
                  </tr>
                  <tr className="group/history invest shadow-lg">
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      20-12-2022
                    </td>
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      06x90a...521
                    </td>
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-green-400 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      profit
                    </td>
                    <td className="bg-white/5 group-hover/history:bg-white/10 cursor-pointer duration-100 border-y-2 first:border-l-2 last:border-r-2 border-black/10 text-black/70 md:p-5 p-3 text-left first:rounded-l-xl last:rounded-r-xl">
                      9,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
