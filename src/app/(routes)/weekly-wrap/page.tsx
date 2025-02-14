import Glare from "@/app/components/glare";
import React from "react";

const WeeklyWrap = () => {
  const generateRandomGlares = (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const left = `${Math.random() * 95}%`;
      const top = `${Math.random() * 95}%`;
      const delay = `${Math.random() * 1}s`;
      const duration = `${Math.random() * 20}s`;
      return (
        <Glare
          key={i}
          className={`absolute`}
          style={{
            left,
            top,
            animationDelay: `${delay}`,
            animationDuration: `${duration}`,
          }}
        />
      );
    });
  };

  return (
    <div className="relative m-8 my-0 flex h-[calc(100%_-_3rem)] w-[70%] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-[#051960]/0">
      <div className="glow-down absolute -top-1/2 left-1/2 -z-0 aspect-square w-80 -translate-x-1/2 rounded-full bg-accent-100 blur-[150px]" />
      {generateRandomGlares(6)}
      <div className="glow-up absolute -bottom-[65%] left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-primary blur-[150px]" />
      <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-12">
        <div>
          <p className="text-4xl font-bold">Your Weekly Study Wrap</p>
          <p>A recap of your key takeaways from this week&apos;s notes</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center -space-y-28">
          <div className="animate-glow inner-glow-multi h-52 w-52 rounded-full bg-[#fee9c2]" />
          <div className="animate-orbit inner-glow h-52 w-52 rounded-full bg-white/10 blur-sm backdrop-blur-xl" />
        </div>
      </div>
    </div>
  );
};

export default WeeklyWrap;
