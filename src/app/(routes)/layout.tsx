import React from "react";

const RouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center overflow-auto py-4">
      {children}
    </div>
  );
};

export default RouteLayout;
