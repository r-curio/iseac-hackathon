"use client";
import React from "react";
import { menuList } from "../libs/menu-list";
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import NavItem from "./nav-item";
import { RxCaretRight } from "react-icons/rx";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="flex h-full w-72 min-w-72 flex-col gap-6 rounded-br-2xl rounded-tr-2xl bg-primary bg-opacity-50">
      <div className="flex items-center gap-3 p-6">
        <TfiLayoutPlaceholder className="h-8 w-8" />
        <h1 className="text-xl font-semibold">Zen</h1>
      </div>
      {menuList.map((group, idx) => (
        <div key={group.key} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 px-6">
            {group.title && (
              <div key={group.title} className="flex gap-3 px-4 py-3">
                <h3 className="bg-gradient-1 bg-clip-text text-sm font-medium text-transparent">
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
      <div className="mt-auto flex items-center gap-3 p-6">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-accent-200">
          <Image
            src="/avatar.png"
            alt="Avatar"
            className="h-10 w-10"
            width={40}
            height={40}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium">Welcome back 👋</p>
          <p className="text-sm font-medium">Sam</p>
        </div>
        <RxCaretRight className="ml-auto h-5 w-5 stroke-1" />
      </div>
    </div>
  );
};

export default Sidebar;
