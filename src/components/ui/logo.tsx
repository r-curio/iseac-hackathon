import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Logo = ({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div className={cn("h-fit w-fit overflow-hidden rounded-full", className)}>
      <Image src="/logo.png" alt="logo" width={size} height={size} />
    </div>
  );
};

export default Logo;
