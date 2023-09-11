import Avatar from "@/assets/avatar.png";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50 w-full">
      <div className="flex flex-1 flex-row items-center h-24 bg-white">
        <div className="flex flex-1">
          <text className="text-xl font-semibold p-5">Dashboard</text>
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
            className={`flex flex-1 flex-col p-2 ${
              true && "mbm:hidden sm:flex"
            }`}
          >
            <text className="text-sm">Nadianara</text>
            <text className="text-xs">Admin</text>
          </div>
        </div>
      </div>
    </div>
  );
}
