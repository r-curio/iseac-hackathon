"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Streak = ({ className }: { className?: string }) => {
  const router = useRouter();

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left / 2 - rect.width / 2;
    const y = e.clientY - rect.top / 2 - rect.height / 2;
    setMousePosition({ x, y });
  }, []);

  return (
    <div
      onClick={() => router.push("/progress-tracker")}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "flex flex-col items-center gap-8 overflow-hidden rounded-xl border border-primary/0 bg-[linear-gradient(139deg,_var(--Primary,_rgba(89,_29,_169,_0.60))_-6.39%,_rgba(0,_2,_10,_0.00)_112.17%)] transition-all duration-300 hover:border-primary/80 hover:bg-[linear-gradient(139deg,_var(--Primary,_rgba(89,_29,_169,_0.35))_-6.39%,_rgba(0,_2,_10,_0.00)_112.17%)] hover:shadow-[inset_0px_0px_48px_4px_var(--Primary,_rgba(89,_29,_169,_0.5))]",
        className,
      )}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 aspect-square h-[500px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full opacity-80 blur-[80px] transition-all delay-0 duration-0",
            "bg-[radial-gradient(50%_50%_at_50%_50%,#591DA9_0%,rgba(18,6,34,0)_100%)]",
          )}
          style={
            isHovering
              ? {
                  transform: `translate(calc(-85% + ${mousePosition.x}px), calc(-60.5% + ${mousePosition.y}px))`,
                }
              : {
                  transform: "translate(-50%, -50%)",
                  transition: "all 0.3s",
                }
          }
        />
        <div className="pointer-events-none relative flex w-full items-center justify-center">
          <Image
            src={"/flame.svg"}
            alt="flame"
            width={0}
            height={0}
            className="aspect-square w-1/4 2xl:w-1/4"
          />
          <Image
            src={"/flame.svg"}
            width={0}
            height={0}
            alt="flame"
            className="absolute left-1/2 top-0 aspect-square w-1/4 -translate-x-1/2 blur-lg 2xl:w-1/4"
          />
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 2xl:gap-6">
        <div className="flex flex-col items-center">
          <p className="bg-gradient-1 bg-clip-text text-[2.75rem] font-bold leading-none text-transparent 2xl:text-[5rem]">
            4
          </p>
          <p className="bg-gradient-1 bg-clip-text text-3xl font-semibold leading-none text-transparent 2xl:text-4xl">
            days streak
          </p>
        </div>
        <p className="text-base leading-none 2xl:text-lg">
          You&apos;re on fire! Keep the momentum going!
        </p>
      </div>
    </div>
  );
};

export default Streak;
