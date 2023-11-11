import React from "react";
import { useState } from "react";
import {
  BsArrowLeftShort,
  BsXCircle,
  BsExclamationCircle,
  BsBookmarkPlus,
  BsPeople,
  BsFiletypePdf,
  BsGear,
  BsBag,
} from "react-icons/bs";

import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

export const Menus = [
  { title: "Dashboard", icon: <BsBookmarkPlus />, href: "/dashboard" },
  { title: "Pedidos", icon: <BsBookmarkPlus />, href: "/pedidos" },
  { title: "Clientes", icon: <BsPeople />, href: "/clientes" },
  { title: "Produtos", icon: <BsBag />, href: "/produtos" },

  // {
  //   title: "Menu Ex. 1",
  //   spacing: true,
  //   icon: <BsExclamationCircle />,
  //   href: "/menu1",
  // },
  // {
  //   title: "Menu Ex. 2",
  //   spacing: true,
  //   icon: <BsExclamationCircle />,
  //   href: "/menu2",
  // },
  // {
  //   title: "Menu Ex. 3",
  //   icon: <BsExclamationCircle />,
  //   href: "/menu3",
  //   submenu: true,
  //   submenuItens: [
  //     { title: "Submenu Ex. 1", href: "/submenu1" },
  //     { title: "Submenu Ex. 2", href: "/submenu2" },
  //   ],
  // },
  {
    title: "Relatorios",
    spacing: true,
    icon: <BsFiletypePdf />,
    href: "/relatorios",
  },
  {
    title: "Configurações",
    icon: <BsGear />,
    spacing: true,
    href: "/configuracoes",
  },
  { title: "Sair", icon: <BsXCircle />, href: "/login" },
];

export function PrivateHeader() {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [subMenuClientActive, setsubMenuClientActive] = useState(false);
  const { push, pathname } = useRouter();

  return (
    <div
      className={`flex flex-col align-middle justify-content-center h-auto bg-white dark:bg-theme-dark.150 ${open ? "w-72" : "w-20"
        } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`text-black text-4xl dark:text-white z-10 rounded-full absolute -right-4 top-2 cursor-pointer ${!open && "rotate-180"
          } p-1.5`}
        onClick={() => setOpen(!open)}
      />
      <div className={`flex items-center px-3 mt-8 mb-4 justify-center`}>
        <Image src={Logo} className="" alt="A" height={125} />
      </div>
      <ul className="flex flex-col px-5 text-gray-500 dark:text-white z-10">
        {Menus.map((menu, index) => (
          <div key={index}>
            <li
              onClick={
                () => {
                  !open && setOpen(true);
                  setSubmenuOpen(true);
                  setsubMenuClientActive(true);
                }
                // menu.submenu
                //   ? (setSubmenuOpen(!submenuOpen),

                // : setsubMenuClientActive(false)
              }
              className={`flex flex-row ${!open ? "justify-center" : "justify-start"
                } items-center gap-x-3 cursor-pointer ${pathname === menu.href &&
                "bg-primary text-white hover:text-white dark:bg-secondary hover:dark:text-white"
                } hover:text-primary hover:dark:text-secondary rounded-md ${menu.spacing ? "mt-9" : "mt-2"
                }`}
            >
              <button
                onClick={() => {
                  if (menu.href === "/login") {
                    destroyCookie(undefined, "mei.authToken");
                  }
                  push(menu.href);
                }}
                className={`group flex flex-1 flex-row ${!open ? "justify-center" : "justify-start"
                  } gap-x-3 items-center px-2.5 py-1  ${!subMenuClientActive ? "" : ""
                  } `}
              >
                <span className="flex align-middle text-xl py-1 float-left duration-300 font-medium">
                  {!open && (
                    <span
                      className={`-my-1.5 ml-14 absolute scale-0 rounded whitespace-nowrap bg-gray-100 dark:bg-theme-dark.150 p-2 text-xs group-hover:scale-100 ${pathname === menu.href &&
                        "bg-primary text-white hover:text-white dark:bg-secondary hover:dark:text-white"
                        } hover:text-primary hover:dark:text-secondary`}
                    >
                      {menu.title}
                    </span>
                  )}
                  {menu.icon ? menu.icon : <BsExclamationCircle />}
                </span>
                <span
                  className={`z-auto text-base text-md font-medium whitespace-nowrap ${!open ? "scale-0 hidden" : "scale-100"
                    } duration-300`}
                >
                  {menu.title}
                </span>

                {/* {!!menu.submenu && open && (
                  <BsChevronDown className={`${submenuOpen && "rotate-180"}`} />
                )} */}
              </button>
            </li>
            {/* {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItens.map((submenuItem, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => setsubMenuClientActive(true)}
                    className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 rounded-md "
                  >
                    <Link
                      href={submenuItem.href}
                      className={`group flex flex-row hover:font-semibold`}
                    >
                      {submenuItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        ))}
      </ul>
    </div>
  );
}
