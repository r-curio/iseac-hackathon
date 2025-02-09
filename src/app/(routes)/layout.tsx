import React from "react";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full items-center justify-center px-10 py-8">
      {children}
    </div>
  );
};

export default RouteLayout;
