import ComingSoon from "@/components/ComingSoon";
import { LockIcon } from "@/components/LockIcon";

export default function Page() {
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
        <div className="flex items-center justify-center mt-8 space-x-8 text-4xl font-mono animate-pulse">
          <div>
            <span className="font-bold">23</span>
            <span className="text-base font-normal">HRS</span>
          </div>
          <div>
            <span className="font-bold">59</span>
            <span className="text-base font-normal">MIN</span>
          </div>
          <div>
            <span className="font-bold">59</span>
            <span className="text-base font-normal">SEC</span>
          </div>
        </div>
      </div>
    </div>
      );
  }