"use client";
import React from "react";
import { useSidebar } from "../../hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div
      className="m-0 mt-16 flex items-center justify-center p-0 lg:m-0 lg:ml-auto lg:px-10 lg:py-8"
      style={{
        width: isMobile
          ? "100%"
          : sidebar.isOpen
            ? "calc(100% - 240px)"
            : "calc(100% - 80px)",
      }}
    >
      {children}
    </div>
  );
};

export default RouteLayout;
