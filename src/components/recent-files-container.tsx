import Image from "next/image";
import React from "react";
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
      className="flex cursor-pointer rounded-xl bg-[linear-gradient(300deg,_var(--P7,_#120622)_14.64%,_var(--S8,_#00020A)_109.56%)] transition-all duration-200 hover:bg-[linear-gradient(120deg,_var(--P7,_#120622)_0%,_var(--S8,_#00020A)_100%)] hover:shadow-[0px_0px_12px_1px_rgba(89,_29,_169,_0.35)]"
      style={{
        backdropFilter: `blur(12.5px)`,
      }}
    >
      <div className="flex aspect-square items-center justify-center rounded-xl bg-primary p-5">
        <Image src="/rocket.png" width={48} height={48} alt={"Rocket"} />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-4 py-4">
        <p className="font-semibold leading-none 2xl:text-lg">{title}</p>
      </div>
      <div className="flex min-w-12 items-center justify-start">
        <ChevronRight className="h-8 w-8" />
      </div>
    </div>
  );
};

export default RecentFilesContainer;
