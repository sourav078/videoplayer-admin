"use client";
import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";
import React, { Fragment } from "react";
import { FaChevronDown, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Avatar, message } from "antd";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { removeToken } from "@/helpers/cookies";

type Props = {};

const ProfileDropdown = (props: Props) => {
  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
      message.error("You are not authorized user");
    },
  });

  return (
    <>
      {status === "loading" ? (
        <FaSpinner
          className="animate-spin h-5 w-5 text-base-gray"
          aria-hidden="true"
        />
      ) : (
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center">
            <span className="sr-only">Open user menu</span>
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
            <span className="hidden lg:flex lg:items-center ">
              <span
                className="ml-3 text-base font-bold leading-[26px] text-base-black"
                aria-hidden="true"
              >
                {session?.user?.data?.first_name +
                  " " +
                  session?.user?.data?.last_name}
              </span>
              <FaChevronDown
                className="ml-3 h-4 w-5 mt-1 text-base-gray"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-[23px] w-[224px] origin-top-right rounded-[6px] bg-white shadow-2xl ring-1 ring-gray-900/5 focus:outline-none">
              <div className="py-3 px-4 border-b border-neutral-100">
                <h2 className="text-base font-medium text-base-black">
                  {session?.user?.data?.first_name +
                    " " +
                    session?.user?.data?.last_name}
                </h2>
                <p className="label_text_2">
                  {session?.user?.data?.email?.length > 20
                    ? session?.user?.data?.email?.slice(0, 20) + "..."
                    : session?.user?.data?.email ?? "No Email Found"}

                  {/* {"No Email Found"} */}
                </p>
              </div>
              <div className="mb-1 border-b border-neutral-100">
                <Link
                  href={`#`}
                  className="flex items-center py-2 px-4 gap-3 text-base-gray"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M8.32463 2.31731C8.75103 0.560897 11.249 0.560897 11.6754 2.31731C11.9508 3.45193 13.2507 3.99038 14.2478 3.38285C15.7913 2.44239 17.5576 4.2087 16.6172 5.75218C16.0096 6.74925 16.5481 8.04918 17.6827 8.32463C19.4391 8.75103 19.4391 11.249 17.6827 11.6754C16.5481 11.9508 16.0096 13.2507 16.6172 14.2478C17.5576 15.7913 15.7913 17.5576 14.2478 16.6172C13.2507 16.0096 11.9508 16.5481 11.6754 17.6827C11.249 19.4391 8.75103 19.4391 8.32463 17.6827C8.04918 16.5481 6.74926 16.0096 5.75219 16.6172C4.2087 17.5576 2.44239 15.7913 3.38285 14.2478C3.99038 13.2507 3.45193 11.9508 2.31731 11.6754C0.560897 11.249 0.560897 8.75103 2.31731 8.32463C3.45193 8.04918 3.99037 6.74926 3.38285 5.75218C2.44239 4.2087 4.2087 2.44239 5.75219 3.38285C6.74926 3.99037 8.04918 3.45193 8.32463 2.31731Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="label_text_1">Account Settings</span>
                </Link>
                <Link
                  href={`#`}
                  className="flex items-center py-2 px-4 gap-3 text-base-gray"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM16 10C16 10.9926 15.759 11.9289 15.3322 12.7536L13.8076 11.229C13.9325 10.8418 14 10.4288 14 10C14 9.67136 13.9604 9.35198 13.8856 9.04638L15.4484 7.4836C15.8024 8.24889 16 9.10137 16 10ZM10.8346 13.9128L12.4156 15.4939C11.6766 15.8193 10.8594 16 10 16C9.10137 16 8.24889 15.8024 7.4836 15.4484L9.04638 13.8856C9.35198 13.9604 9.67136 14 10 14C10.2862 14 10.5654 13.9699 10.8346 13.9128ZM6.15807 11.1171C6.05516 10.7626 6 10.3877 6 10C6 9.66808 6.04043 9.3456 6.11663 9.03722L6.0378 9.11604L4.50611 7.58436C4.18068 8.32343 4 9.14061 4 10C4 10.9539 4.22258 11.8557 4.61864 12.6565L6.15807 11.1171ZM7.24639 4.66778C8.07107 4.24104 9.00739 4 10 4C10.9539 4 11.8557 4.22258 12.6565 4.61864L11.1171 6.15807C10.7626 6.05516 10.3877 6 10 6C9.57122 6 9.1582 6.06747 8.77097 6.19236L7.24639 4.66778ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="label_text_1">Help Center</span>
                </Link>
              </div>
              <div>
                <Button
                  isLoading={status === "loading"}
                  type="button"
                  onClick={() => {
                    signOut({
                      callbackUrl: "/login",
                    });

                    removeToken();
                  }}
                  className="flex  py-2 px-4 gap-3 text-base-gray bg-transparent hover:bg-red-600 w-full 
                  hover:text-white items-start justify-start
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 3C3.55229 3 4 3.44771 4 4L4 16C4 16.5523 3.55228 17 3 17C2.44771 17 2 16.5523 2 16L2 4C2 3.44771 2.44772 3 3 3ZM10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711L9.41421 9L17 9C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11L9.41421 11L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L6.29289 10.7071C6.10536 10.5196 6 10.2652 6 10C6 9.73478 6.10536 9.48043 6.29289 9.29289L9.29289 6.29289C9.68342 5.90237 10.3166 5.90237 10.7071 6.29289Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="label_text_1">Sign Out</span>
                </Button>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
};

export default ProfileDropdown;
