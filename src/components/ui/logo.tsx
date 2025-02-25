import Image from "next/image";
import React from "react";

const Logo = ({ size = 36 }: { size?: number }) => {
  return (
    <div className="h-fit w-fit overflow-hidden rounded-full">
      <Image src="/logo.png" alt="logo" width={size} height={size} />
    </div>
  );
};

export default Logo;
