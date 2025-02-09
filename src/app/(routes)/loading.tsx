import React from "react";

const RouteLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-24 w-24">
        <div className="absolute h-full w-full animate-spin rounded-full border-[16px] border-accent-200 border-t-primary" />
      </div>
    </div>
  );
};

export default RouteLoading;
