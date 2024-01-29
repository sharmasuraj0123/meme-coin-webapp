export const PlaceHolderTimer = () => (
    <div className="flex items-center justify-center mt-8 space-x-8 text-4xl font-mono animate-pulse">
      <div className="text-center">
        <span className="block font-bold text-xl">--</span>
        <span className="text-base font-normal">Day(s)</span>
      </div>
      <div className="text-center">
        <span className="block font-bold text-xl">--</span>
        <span className="text-base font-normal">HRS</span>
      </div>
      <div className="text-center">
        <span className="block font-bold text-xl">--</span>
        <span className="text-base font-normal">MIN</span>
      </div>
      <div className="text-center">
        <span className="block font-bold text-xl">--</span>
        <span className="text-base font-normal">SEC</span>
      </div>
    </div>
  );