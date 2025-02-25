"use client";
import React, {useEffect, useState} from "react";
import { menuList } from "../app/libs/menu-list";
import NavItem from "./nav-item";
import { RxCaretRight, RxCaretLeft } from "react-icons/rx";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileNav from "./mobile-nav";
import Logo from "../../public/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "../hooks/use-sidebar";
import { createClient } from "@/utils/supabase/client";

const Sidebar = () => {
  const sidebar = useSidebar();
  const isMobile = useIsMobile();
  const supabase = createClient();

  const [profile, setProfile] = useState<{ username: string, avatar_url: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {

      const { data: {user} } = await supabase.auth.getUser();

      const response = await fetch(`/api/${user?.id}`);
      const data = await response.json();

      setProfile(data);
    }

    fetchProfile();
  }, []);

  return isMobile ? (
    <MobileNav />
  ) : (
    <div
      className={`sticky left-0 top-0 flex h-screen flex-col gap-2 rounded-br-2xl rounded-tr-2xl bg-primary bg-opacity-50 transition-all duration-300 2xl:gap-6 ${
        !sidebar.isOpen ? "w-20 min-w-fit" : "w-72 min-w-72"
      }`}
    >
      <Link
        href="/"
        className={`flex items-center gap-3 p-3 px-6 pt-4 2xl:p-6 ${!sidebar.isOpen ? "justify-center" : ""}`}
      >
        <Image src={Logo} alt="Zen" width={30} height={30} />
        {sidebar.isOpen && <h1 className="text-xl font-semibold">Zen</h1>}
      </Link>
      {menuList.map((group, idx) => (
        <div key={group.key} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 xl:px-4 2xl:px-6">
            {group.title && !!sidebar.isOpen && (
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
                isCollapsed={!sidebar.isOpen}
              />
            ))}
          </div>
          {idx !== menuList.length - 1 && (
            <div className="h-px bg-nav-border"></div>
          )}
        </div>
      ))}
      <div
        className={`mt-auto flex items-center gap-3 px-6 xl:p-3 2xl:p-6 ${!sidebar.isOpen ? "justify-center" : ""}`}
      >
        {sidebar.isOpen && (
          <>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-accent-200">
              <Image
                src={profile?.avatar_url || '/default-avatar.png'}
                alt="Avatar"
                className="h-10 w-10"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-medium">Welcome back 👋</p>
              <p className="text-sm font-medium">{profile?.username}</p>
            </div>
          </>
        )}
        <button
          onClick={
            sidebar.isOpen ? () => sidebar.onClose() : () => sidebar.onOpen()
          }
          className={`ml-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent-200 ${
            !sidebar.isOpen ? "ml-0" : ""
          }`}
        >
          {!sidebar.isOpen ? (
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
