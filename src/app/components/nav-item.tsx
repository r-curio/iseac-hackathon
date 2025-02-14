"use client";

import { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../libs/utils";

interface NavItemProps {
  label: string;
  icon: IconType;
  path: string;
  isCollapsed?: boolean;
}

const NavItem = ({ label, icon: Icon, path, isCollapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
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
      {!isCollapsed && (
        <span
          className={cn(
            "text-sm font-medium",
            isActive ? "text-white" : "text-gray",
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
};

export default NavItem;
