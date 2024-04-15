'use client';
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="mt-5 flex flex-col">
        <Link href={"/room-config"} className="mx-3 text-center text-2xl md:text-3xl md:text-start font-bold text-white">
          Back to Room
        </Link>
        <div className="md:text-5xl text-end md:text-center font-bold">
          Tsukuba Express
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-4/5 py-20 text-3xl font-bold rounded-lg bg-white">
          <div className="px-3">
            STATS
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;