import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardContent, Card } from "@/components/ui/card";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { LayoutDashboardIcon } from "@/components/LayoutDashboardIcon";
import { ActivityIcon } from "@/components/ActivityIcon";
import { StoreIcon } from "@/components/StoreIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PION",
  description: "Finance for i-Gaming Ventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div key="1" className="bg-white flex min-h-screen">
        <nav className="w-64 p-8 bg-red-800 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-8">
              <img
                alt="PION Logo"
                className="h-16 w-auto"
                src="/pion.png"
              />
            </h1>
            <ul>
              <li className="mb-4 flex items-center">
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <Link className="text-lg" href="/dashboard">
                  Dashboard
                </Link>
                <span className="ml-2">
                  <div className="h-4 w-4" />
                </span>
              </li>
              <li className="mb-4 flex items-center">
                <StoreIcon className="mr-2 h-4 w-4" />
                <Link className="text-lg" href="/sale">
                  Buy PION
                </Link>
              </li>
              <li className="mb-4 flex items-center">
                <ActivityIcon className="mr-2 h-4 w-4" />
                <Link className="text-lg" href="/performance">
                  Pool Performance
                </Link>
              </li>
            </ul>
          </div>
          <Button className="mt-4 border-2 border-white rounded-full bg-transparent">
            Connect Wallet
          </Button>
        </nav>
        {children}
      </div>
    </html>
  );
}
