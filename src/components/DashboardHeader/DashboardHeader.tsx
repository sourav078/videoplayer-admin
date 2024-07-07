"use client";
import Logo from "@/assets/lerge_logo.png";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import Notification from "../Notification/Notification";
import ProfileDropdown from "../shared/ProfileDropdown";
import { GiWorld } from "react-icons/gi";
import { message, Tooltip } from "antd";

type IUserNavigation = {
  name: string;
  href: string;
};

type Props = {
  setSidebarOpen: (value: boolean) => void;
  userNavigation?: IUserNavigation[];
};

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Homepage Settings",
    href: "/homepage-settings",
  },
];

function DashboardHeader({ setSidebarOpen, userNavigation }: Props) {
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });

    message.success("Cache Cleared Successfully");
  };

  return (
    <div className="sticky top-0 z-40 flex h-[88px] shrink-0 items-center lg:px-[48px] border-b border-gray-200 bg-white pe-4 shadow-sm gap-3 lg:py-[20px] ">
      <button
        type="button"
        className="text-base-gray lg:hidden w-[56px] flex justify-center border-e border-neutral-100 h-full items-center"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        {/* <FaBarsStaggered className="h-6 w-6" aria-hidden="true" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
        >
          <path
            d="M1 1H17M1 7H17M1 13H17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Separator */}
      <div
        style={{
          boxShadow:
            "0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
        }}
        className="w-px bg-white lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-1 gap-x-4 gap-[24px] items-center justify-between">
        <div className="flex  items-center gap-x-10">
          <Link href="/" className="hidden lg:block flex-shrink-0 w-[268px] ">
            {/* <Logo /> */}
            <Image
              className="bg-primary rounded-lg p-1"
              src={Logo}
              alt="Kids App Logo"
              width={268}
              height={40}
            />
          </Link>
          <div className="flex gap-x-4 items-center">
            {/* world logo */}

            <Tooltip title="Browse Website">
              <Link
                className="bg-gray-200 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                target="_blank"
                href={"https://kids-player.com/"}
              >
                <GiWorld />
              </Link>
            </Tooltip>
            <Tooltip title="Clear Cache">
              <button
                className="bg-gray-200 p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
                onClick={clearCacheData}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    id="_74846e5be5db5b666d3893933be03656"
                    data-name="74846e5be5db5b666d3893933be03656"
                    d="M7.719,8.911H8.9V10.1H7.719v1.185H6.539V10.1H5.36V8.911h1.18V7.726h1.18ZM5.36,13.652h1.18v1.185H5.36v1.185H4.18V14.837H3V13.652H4.18V12.467H5.36Zm13.626-2.763H10.138V10.3a1.182,1.182,0,0,1,1.18-1.185h2.36V2h1.77V9.111h2.36a1.182,1.182,0,0,1,1.18,1.185ZM18.4,18H16.044a9.259,9.259,0,0,0,.582-2.963.59.59,0,1,0-1.18,0A7.69,7.69,0,0,1,14.755,18H12.5a9.259,9.259,0,0,0,.582-2.963.59.59,0,1,0-1.18,0A7.69,7.69,0,0,1,11.216,18H8.958a22.825,22.825,0,0,0,1.163-5.926H18.99A19.124,19.124,0,0,1,18.4,18Z"
                    transform="translate(-3 -2)"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            </Tooltip>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hidden lg:block"
              >
                <span className="text-sm text-base-gray hover:text-primary">
                  {item.name}
                </span>
              </Link>
            ))}

            <Link
              href="/products"
              className="bg-primary/10 text-primary py-1 px-4 rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out hidden lg:block"
            >
              Add New +
            </Link>
          </div>
        </div>
        {/* search Firld */}

        {/* <SearchField /> */}
        <div className="flex items-center gap-x-3">
          <Notification />

          <div className="flex items-center gap-x-6">
            {/* Separator */}
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 ml-6"
              aria-hidden="true"
            />

            {/* Profile dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
