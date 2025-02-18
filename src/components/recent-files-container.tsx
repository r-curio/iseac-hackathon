import Image from "next/image";
import React from "react";
import Progress from "./progress-bar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const RecentFilesContainer = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("flex rounded-br-xl rounded-tr-xl bg-[#120622]", className)}
    >
      <div className="flex aspect-square items-center justify-center rounded-xl bg-primary p-6">
        <Image src="/rocket.png" width={60} height={60} alt={"Rocket"} />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 px-4 py-4">
        <p className="font-semibold leading-none 2xl:text-lg">{title}</p>
      </div>
      <div className="flex min-w-12 items-center justify-start">
        <ChevronRight className="h-8 w-8" />
      </div>
    </div>
  );
};

export default RecentFilesContainer;
