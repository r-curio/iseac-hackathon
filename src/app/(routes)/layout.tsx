"use client";
import React from "react";
import { useSidebar } from "../../hooks/use-sidebar";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useSidebar();

  return (
    <div
      className="ml-auto flex items-center justify-center px-10 py-8"
      style={{
        width: sidebar.isOpen ? "calc(100% - 170px)" : "calc(100% - 10px)",
      }}
    >
      {children}
    </div>
  );
};

export default RouteLayout;
