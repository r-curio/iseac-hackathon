"use client";
import React from "react";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div
      className="ml-auto flex items-center justify-center px-10 py-8"
    >
      {children}
    </div>
  );
};

export default RouteLayout;
