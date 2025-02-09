"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { menuList } from "../libs/menu-list";
import NavItem from "./nav-item";
import Logo from "../../../public/Logo.svg";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-primary bg-opacity-50 p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="Zen" width={30} height={30} />
          <h1 className="text-xl font-semibold">Zen</h1>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          <RxHamburgerMenu className="h-6 w-6" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-primary bg-opacity-50 p-4">
          {menuList.map((group) => (
            <div key={group.key} className="flex flex-col gap-3">
              {group.title && (
                <h3 className="bg-gradient-1 bg-clip-text px-4 py-3 text-sm font-medium text-transparent">
                  {group.title}
                </h3>
              )}
              {group.groupLabels.map(({ label, icon, path }) => (
                <NavItem key={label} label={label} icon={icon} path={path} />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileNav;
