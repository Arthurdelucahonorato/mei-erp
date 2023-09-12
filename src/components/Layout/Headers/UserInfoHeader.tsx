import React from "react";
import Avatar from "@/assets/avatar.png";
import Image from "next/image";
import { ToggleDarkMode } from "@/components/Button/ToggleDarkMode";

export function UserInfoHeader() {
  return (
    <div className="flex flex-row justify-between items-center max-h-24 w-full bg-white dark:bg-gray-900">
      <div className="flex mr-auto">
        <text className="text-xl font-semibold p-5">Dashboard</text>
      </div>
      <div>
        <ToggleDarkMode />
      </div>
      <div className="flex bg-primary-fifth-tone rounded-xl p-1 mr-2 px-3">
        <Image
          src={Avatar}
          className={`duration-200 rounded-full`}
          alt="A"
          height={50}
          width={50}
        />
        <div
          className={`flex flex-1 flex-col p-2 ${true && "mbm:hidden sm:flex"}`}
        >
          <text className="text-sm">Nadianara</text>
          <text className="text-xs">Admin</text>
        </div>
      </div>
    </div>
  );
}
