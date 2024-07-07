import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { INavigation } from "@/constant/dashboardItems";

type Props = {
  item: INavigation;
  pathname: string;
};

const CollapseDropdown = ({ item, pathname }: Props) => {
  return (
    <Disclosure
      as="div"
      className={"w-full"}
      // parent open
      defaultOpen={
        item?.children?.some((child) => child?.href === pathname) ||
        (item?.children &&
          item?.children?.some((child) =>
            child?.children?.some((child) => child?.href === pathname)
          )) ||
        false
      }
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`group w-full flex items-center justify-between gap-3 rounded-md px-3 py-[10px] text-sm ${
              pathname === item?.href
                ? "text-white bg-blue-600"
                : "text-base-gray hover:text-base-black hover:bg-neutral-50"
            }

            ${
              open
                ? "bg-neutral-50 text-primary hover:bg-neutral-50 hover:text-primary  "
                : ""
            }
            `}
          >
            <div className={` flex items-center gap-3 text-start text-sm `}>
              <span>{item?.icon}</span>
              {item?.name}
            </div>

            <svg
              className={`transform transition-transform ${
                open ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 7.33879C5.68342 6.94827 6.31658 6.94827 6.7071 7.33879L9.99999 10.6317L13.2929 7.33879C13.6834 6.94827 14.3166 6.94827 14.7071 7.33879C15.0976 7.72932 15.0976 8.36248 14.7071 8.75301L10.7071 12.753C10.3166 13.1435 9.68341 13.1435 9.29289 12.753L5.29289 8.75301C4.90237 8.36248 4.90237 7.72932 5.29289 7.33879Z"
                fill={"#666666"}
              />
            </svg>
          </Disclosure.Button>

          <Disclosure.Panel as="dd" className="mt-2 ml-[23px]">
            {item?.children?.map((child, i) => (
              <>
                {child?.children && child?.children?.length > 0 ? (
                  // child has children
                  <Disclosure
                    as="div"
                    className={"w-full"}
                    // child open
                    defaultOpen={
                      child?.children?.some(
                        (child) => child?.href === pathname
                      ) || false
                    }
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`group w-full flex items-center justify-between gap-3 rounded-md px-3 py-[10px] text-sm ${
                            pathname === child?.href
                              ? "text-white bg-blue-600"
                              : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                          }

            ${
              open
                ? "bg-neutral-50 text-primary hover:bg-neutral-50 hover:text-primary  "
                : ""
            }
            `}
                        >
                          <div
                            className={` flex items-center gap-3 text-start text-sm `}
                          >
                            <span>{child?.icon}</span>
                            {child?.name}
                          </div>

                          <svg
                            className={`transform transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 7.33879C5.68342 6.94827 6.31658 6.94827 6.7071 7.33879L9.99999 10.6317L13.2929 7.33879C13.6834 6.94827 14.3166 6.94827 14.7071 7.33879C15.0976 7.72932 15.0976 8.36248 14.7071 8.75301L10.7071 12.753C10.3166 13.1435 9.68341 13.1435 9.29289 12.753L5.29289 8.75301C4.90237 8.36248 4.90237 7.72932 5.29289 7.33879Z"
                              fill={"#666666"}
                            />
                          </svg>
                        </Disclosure.Button>

                        <Disclosure.Panel as="dd" className="mt-2 ml-[23px]">
                          {child?.children?.map((child, i) => (
                            <Link
                              href={child?.href}
                              key={i}
                              className={`group flex items-center gap-3`}
                            >
                              {/* vertical line */}
                              <motion.span
                                className="w-[1px] h-[40px] bg-primary  "
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.5,
                                  delay: i * 0.2,
                                }}
                              ></motion.span>

                              <motion.span
                                className={` rounded-md px-3 py-[10px] text-sm w-full  ${
                                  pathname === child?.href
                                    ? "text-white bg-blue-600"
                                    : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                                }`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.5,
                                  delay: i * 0.2,
                                }}
                              >
                                {child?.name}
                              </motion.span>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ) : (
                  // child has no children
                  <Link
                    href={child?.href}
                    key={i}
                    className={`group flex items-center gap-3`}
                  >
                    {/* vertical line */}
                    <motion.span
                      className="w-[1px] h-[40px] bg-primary  "
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    ></motion.span>

                    <motion.span
                      className={` rounded-md px-3 py-[10px] text-sm w-full  ${
                        pathname === child?.href
                          ? "text-white bg-blue-600"
                          : "text-base-gray hover:text-base-black hover:bg-neutral-50"
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    >
                      {child?.name}
                    </motion.span>
                  </Link>
                )}
              </>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CollapseDropdown;
