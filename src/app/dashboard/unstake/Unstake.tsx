import Link from "next/link";
import { UnstakeIcon } from "@/components/UnstakeIcon";

export default function Unstake() {
  return (
    <Link
      className="inline-flex h-11 items-center justify-center rounded-md bg-red-800 px-5 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      href="/dashboard/unstake"
    >
      Unstake
      <UnstakeIcon />
    </Link>
  );
}
