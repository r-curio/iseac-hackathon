"use client";
import React from "react";
import { menuList } from "../libs/menu-list";
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import { usePathname } from "next/navigation";
import NavItem from "./nav-item";
import { RxCaretRight } from "react-icons/rx";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 h-full w-72 rounded-tr-2xl rounded-br-2xl bg-primary bg-opacity-50">
      <div className="flex gap-3 items-center p-6">
        <TfiLayoutPlaceholder className="w-8 h-8" />
        <h1 className="text-xl font-semibold">Zen</h1>
      </div>
      {menuList.map((group, idx) => (
        <div key={group.key} className="flex gap-3 flex-col">
          <div className="flex flex-col px-6 gap-1">
            {group.title && (
              <div key={group.title} className="flex gap-3 px-4 py-3">
                <h3 className="text-sm bg-gradient-1 font-medium bg-clip-text text-transparent">
                  {group.title}
                </h3>
              </div>
            )}
            {group.groupLabels.map(({ label, icon: Icon, path }) => (
              <NavItem key={label} label={label} icon={Icon} path={path} />
            ))}
          </div>
          {idx !== menuList.length - 1 && (
            <div className="h-px bg-nav-border"></div>
          )}
        </div>
      ))}
      <div className="mt-auto p-6 flex gap-3 items-center">
        <div className="bg-accent-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
          <img src="./avatar.png" alt="Avatar" className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium">Welcome back 👋</p>
          <p className="text-sm font-medium">Sam</p>
        </div>
        <RxCaretRight className="ml-auto w-5 h-5 stroke-1" />
      </div>
    </div>
  );
};

export default Sidebar;
