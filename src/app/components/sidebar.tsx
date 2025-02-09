"use client";
import React from "react";
import { menuList } from "../libs/menu-list";
import { useState } from "react";
import NavItem from "./nav-item";
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./mobile-nav";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    isMobile ? <MobileNav /> :
    <div 
      className={`flex flex-col min-h-fit h-full gap-6 rounded-br-2xl rounded-tr-2xl bg-primary bg-opacity-50 transition-all duration-300 ${
        isCollapsed ? "w-20 min-w-fit" : "w-72 min-w-72"
      }`}
    >
      <Link href="/" className={`flex items-center gap-3 p-6 ${isCollapsed ? "justify-center" : ""}`}>
        <Image src={Logo} alt="Zen" width={30} height={30}/>
        {!isCollapsed && <h1 className="text-xl font-semibold">Zen</h1>}
      </Link>
      {menuList.map((group, idx) => (
        <div key={group.key} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 px-6">
            {group.title && !isCollapsed && (
              <div key={group.title} className="flex gap-3 px-4 py-3">
                <h3 className="bg-gradient-1 bg-clip-text text-sm font-medium text-transparent">
                  {group.title}
                </h3>
              </div>
            )}
            {group.groupLabels.map(({ label, icon: Icon, path }) => (
              <NavItem 
                key={label} 
                label={label} 
                icon={Icon} 
                path={path} 
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
          {idx !== menuList.length - 1 && (
            <div className="h-px bg-nav-border"></div>
          )}
        </div>
      ))}
      <div className={`mt-auto flex items-center gap-3 p-6 ${isCollapsed ? "justify-center" : ""}`}>
        {!isCollapsed && (
          <>
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
          </>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`ml-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent-200 ${
            isCollapsed ? "ml-0" : ""
          }`}
        >
          {isCollapsed ? (
            <RxCaretRight className="h-5 w-5 stroke-1" />
          ) : (
            <RxCaretLeft className="h-5 w-5 stroke-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;