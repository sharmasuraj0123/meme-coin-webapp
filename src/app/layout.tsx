"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LayoutDashboardIcon } from "@/components/LayoutDashboardIcon";
import { ActivityIcon } from "@/components/ActivityIcon";
import { StoreIcon } from "@/components/StoreIcon";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { createConfig, WagmiConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { LoadingProvider } from "@/context/Loading";
import ContentWithSpinner from "./ContentWithSpinner";

const inter = Inter({ subsets: ["latin"] });

const chainEnv = process.env.NEXT_PUBLIC_CHAIN_ENV;

const getChain = () => {
  if (chainEnv === "mainnet") {
    return polygon;
  } else if (chainEnv === "testnet") {
    return polygonMumbai;
  } else {
    return polygonMumbai;
  }
};

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
    appName: "Pion",
    chains: [getChain()],
  })
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Pion</title>
        <meta name="description" content="Finance for i-Gaming Ventures" />
      </head>
      <body className={inter.className}>
        <SpeedInsights />
        <LoadingProvider>
          <WagmiConfig config={config}>
            <ConnectKitProvider>
              <ContentWithSpinner>
                <div key="1" className="bg-white flex min-h-screen">
                  <nav className="w-64 p-8 bg-red-800 text-white flex flex-col justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-8">
                        <div className="inline-flex items-center">
                          <img
                            alt="PION Protocol"
                            className="h-16 w-auto"
                            src="/Pion-logo.png"
                          />
                          <span className="ml-2 size bg-yellow-200 text-black font-bold text-lg p-1 rounded">
                            Testnet
                          </span>
                        </div>
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
                    <div className="self-center">
                      <ConnectKitButton theme="soft" />
                    </div>
                  </nav>
                  {children}
                </div>
              </ContentWithSpinner>
            </ConnectKitProvider>
          </WagmiConfig>
        </LoadingProvider>
      </body>
    </html>
  );
}
