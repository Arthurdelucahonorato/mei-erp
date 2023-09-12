import React from "react";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import { ToggleDarkMode } from "@/components/Button/ToggleDarkMode";
import { useRouter } from "next/router";
import { Menus } from "./PrivateHeader";

export function UserInfoHeader() {
  const { pathname } = useRouter();

  const pathTitle = Menus.find((route) => route.href === pathname)?.title;

  return (
    <div className="flex flex-row justify-between items-center max-h-24 w-full bg-white dark:bg-gray-900">
      <div className="flex mr-auto">
        <text className="text-xl font-semibold p-5 dark:text-white">{pathTitle}</text>
      </div>
      <div className="pr-5">
        <ToggleDarkMode />
      </div>
      <div className="flex bg-primary-fifth-tone dark:bg-gray-800 rounded-xl p-1 mr-2 px-3">
        <Image
          src={Avatar}
          className={`duration-200 rounded-full`}
          alt="A"
          height={50}
          width={50}
        />
        <div
          className={`flex flex-1 flex-col p-2 ${true && "mbm:hidden sm:flex"} dark:text-white`}
        >
          <text className="text-sm">Nadianara</text>
          <text className="text-xs">Admin</text>
        </div>
      </div>
    </div>
  );
}
