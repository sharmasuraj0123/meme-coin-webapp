"use client";
import { LockIcon } from "@/components/LockIcon";
import { PlaceHolderTimer } from "@/components/PlaceHolderTimer";
import { Timer } from "@/components/Timer";
import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Page() {
  const calculateTimeLeft = (targetDate: string) => {
    const target = new Date(targetDate);
    const difference = +target - +new Date();

    let timeDiff = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeDiff = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeDiff;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft("2024-2-05"));
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grow relative h-screen overflow-hidden">
      <img
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full filter blur-[4px]"
        height="1080"
        src="/SaleBackground.png"
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width="1920"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex flex-col items-center justify-center h-full text-center text-white">
        <LockIcon className="h-24 w-24 mb-8 animate-pulse" />
        <h1 className="text-6xl font-bold animate-pulse">Unlocking Soon</h1>
        <p className="text-xl mt-2">Stay Tuned for Token Sale!</p>
        {timeLeft ? <Timer timeLeft={timeLeft} /> : <PlaceHolderTimer />}
       
      </div>
    </div>
  );
}
