import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import { RxCross1 } from "react-icons/rx";
import Logo from "@/assets/lerge_logo.png";
import Image from "next/image";
import { INavigation } from "@/constant/dashboardItems";
import CollapseDropdown from "../shared/CollapseDropdown";
import Loading from "@/app/loading";

type Props = {
  setSidebarOpen: (value: boolean) => void;
  sidebarOpen: boolean;
  navigation: INavigation[] | undefined;
  isLoading: boolean;

  pathname: string;
};

const DashboardSideBar = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  isLoading,

  pathname,
}: Props) => {
  return (
    <>
      {/* mobail */}

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <RxCross1
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col overflow-y-auto bg-white px-6">
                  <div className="flex h-16 shrink-0 items-center mt-3">
                    <Link href="/">
                      <Link href={"#"} className="flex-shrink-0 w-[268px]">
                        <Image
                          src={Logo}
                          alt="Kids App Logo"
                          className="w-[268px] h-16 bg-primary rounded-lg p-1"
                        />
                      </Link>
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col">
                      <li>
                        <div className="text-xs font-medium tracking-[1.44px] leading-6 text-gray-400 p-4">
                          NAVIGATION
                        </div>
                        <ul role="list" className="space-y-1">
                          {navigation?.map((item) => (
                            <li key={item?.name}>
                              {item?.children && item?.children?.length > 0 ? (
                                <CollapseDropdown
                                  item={item}
                                  pathname={pathname}
                                />
                              ) : (
                                <Link
                                  href={item?.href || "#"}
                                  className={`group flex items-center gap-3 rounded-md px-3 py-[10px] text-sm ${
                                    pathname === item?.href
                                      ? "text-white bg-blue-600"
                                      : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                                  }`}
                                >
                                  <span>{item?.icon}</span>

                                  {item?.name}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                      {/* <li>
                        <div className="text-xs font-medium tracking-[1.44px] leading-6 text-gray-400 p-4">
                          APPLICATION & PAYMENT
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {teams.map((team: ITeam) => (
                            <li key={team?.name}>
                              <Link
                                href={team?.href}
                                className={`group flex items-center gap-3 rounded-md px-3 py-[10px] text-sm ${
                                  pathname === team?.href
                                    ? "text-white bg-blue-600"
                                    : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                                }`}
                              >
                                <span>{team?.icon}</span>
                                {team?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* mobile end */}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:inset-y-0 lg:z-50 lg:flex lg:max-w-[292px] w-full lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex h-full grow flex-col gap-y-5 overflow-y-auto shadow-sm bg-white  py-3 rounded-[16px] lg:fixed lg:max-w-[292px] w-full px-4">
          {isLoading ? (
            <Loading />
          ) : (
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col">
                <li>
                  <div className="text-xs font-medium tracking-[1.44px] leading-6 text-gray-400 p-4">
                    NAVIGATION
                  </div>
                  <ul role="list" className="space-y-1">
                    {navigation?.map((item) => (
                      <li key={item?.name}>
                        {item?.children && item?.children?.length > 0 ? (
                          <CollapseDropdown item={item} pathname={pathname} />
                        ) : (
                          <Link
                            href={item?.href || "#"}
                            className={`group flex items-center text-start gap-3 rounded-md px-3 py-[10px] text-sm ${
                              pathname === item?.href
                                ? "text-white bg-blue-600"
                                : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                            }`}
                          >
                            <span>{item?.icon}</span>

                            {item?.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="mt-3">
                <div className="text-xs font-medium tracking-[1.44px] leading-6 text-gray-400 p-4">
                  APPLICATION & PAYMENT
                </div>
                <ul role="list" className="space-y-1">
                  {teams.map((team) => (
                    <li key={team?.name}>
                      <Link
                        href={team?.href}
                        className={`group flex items-center gap-3 rounded-md px-3 py-[10px] text-sm ${
                          pathname === team?.href
                            ? "text-white bg-blue-600"
                            : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                        }`}
                      >
                        <span>{team?.icon}</span>
                        {team?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li> */}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSideBar;
