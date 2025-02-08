"use client";

import { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../libs/utils";

interface NavItemProps {
  label: string;
  icon: IconType;
  path: string;
}

const NavItem = ({ label, icon: Icon, path }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-full transition-all",
        isActive
          ? "bg-gradient-nav-active text-white"
          : "hover:bg-accent-200/20 active:bg-nav-click text-gray",
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray")} />
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
