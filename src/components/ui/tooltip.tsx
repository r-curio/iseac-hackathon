"use client";

import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  delay?: number;
}

const Tooltip = ({
  content,
  children,
  side = "right",
  delay = 500,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={cn(
          "absolute z-50 rounded-full bg-accent-200/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-all duration-200",
          isVisible && "opacity-100",
          side === "right" && "left-full top-1/2 ml-2 -translate-y-1/2",
          side === "left" && "right-full top-1/2 mr-2 -translate-y-1/2",
          side === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          side === "bottom" && "left-1/2 top-full mt-2 -translate-x-1/2",
        )}
      >
        <p className="w-max">{content}</p>
      </div>
    </div>
  );
};

export default Tooltip;
