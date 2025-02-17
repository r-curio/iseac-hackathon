"use client";
import React from "react";
import { useSidebar } from "../../hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div
      className="m-0 mt-16 flex items-center justify-center p-0 transition-all lg:m-0 lg:ml-auto lg:px-10 lg:py-8"
      style={{
        width: isMobile
          ? "100%"
          : sidebar.isOpen
            ? "calc(100% - 240px)"
            : "calc(100% - 80px)",
      }}
    >
      <div className="h-full w-full xl:max-w-[1100px] 2xl:max-w-[1300px]">
        {children}
      </div>
    </div>
  );
};

export default RouteLayout;
