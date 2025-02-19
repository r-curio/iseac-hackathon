"use client";

import { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../app/libs/utils";
import Tooltip from "./ui/tooltip";
import { Trophy } from "lucide-react";

interface NavItemProps {
  label: string;
  icon: IconType;
  path: string;
  isCollapsed?: boolean;
}

const NavItem = ({ label, icon: Icon, path, isCollapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return isCollapsed ? (
    <Tooltip content={label}>
      <Link
        href={path}
        className={cn(
          "flex items-center gap-3 rounded-full px-4 py-3 transition-all",
          isCollapsed ? "justify-center" : "",
          isActive
            ? "bg-gradient-nav-active text-white"
            : "text-gray hover:bg-accent-200/20 active:bg-nav-click",
        )}
      >
        {path === "/weekly-wrap" ? (
          <div className="group relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 animate-pulse rounded-full bg-accent-200 opacity-10 blur-xl transition-all duration-1000" />

            {/* Trophy icon */}
            <div className="relative">
              <Trophy className="h-5 w-5 text-accent-200 transition-colors duration-500" />
            </div>
          </div>
        ) : (
          <Icon className={cn("h-5 w-5", isActive && "text-accent-200")} />
        )}
      </Link>
    </Tooltip>
  ) : (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-3 rounded-full px-4 py-3 transition-all",
        isCollapsed ? "justify-center" : "",
        isActive
          ? "bg-gradient-nav-active text-white"
          : "text-gray hover:bg-accent-200/20 active:bg-nav-click",
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray")} />
      <span
        className={cn(
          "text-sm font-medium",
          isActive ? "text-white" : "text-gray",
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavItem;
