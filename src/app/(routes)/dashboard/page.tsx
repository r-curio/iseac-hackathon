import { cn } from "@/app/libs/utils";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-full w-full lg:max-w-[1400px]">
      <div className="relative flex h-fit w-full overflow-hidden rounded-[32px]">
        <Image
          src="/dashboard-img/1920.png"
          alt="Dashboard"
          width={1920}
          height={538}
          // unoptimized
          quality={100}
          className="h-72 w-full object-cover"
        />
        <div className="absolute bottom-[10%] left-[2.5%]">
          <p className="text-5xl font-bold">Time to Learn,</p>
          <p className="bg-gradient-1 bg-clip-text text-5xl font-bold text-transparent">
            Sam!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
