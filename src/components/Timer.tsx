import { TimeLeft } from "@/app/sale/page";

interface TimerProps {
  timeLeft: TimeLeft;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <div className="flex items-center justify-center mt-8 space-x-8 text-4xl font-mono animate-pulse">
      <div>
        <span className="font-bold">{timeLeft.days}</span>
        <span className="text-base font-normal">Day(s)</span>
      </div>
      <div>
        <span className="font-bold">{timeLeft.hours}</span>
        <span className="text-base font-normal">HRS</span>
      </div>
      <div>
        <span className="font-bold">{timeLeft.minutes}</span>
        <span className="text-base font-normal">MIN</span>
      </div>
      <div>
        <span className="font-bold">{timeLeft.seconds}</span>
        <span className="text-base font-normal">SEC</span>
      </div>
    </div>
  );
};
