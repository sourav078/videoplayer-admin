"use client";
/* eslint-disable @next/next/no-img-element */

import { Badge } from "antd";
import Link from "next/link";
import React from "react";
import { FaRegBell } from "react-icons/fa";
import Popovers from "../shared/Popover";

const Notification = () => {
  // const {userId} =

  //   const { data: user } = useUserProfileQuery(undefined, {
  //     refetchOnMountOrArgChange: true,
  //   });

  const userInfo: any = null;

  const [isOpenNotification, setIsOpenNotification] = React.useState(false);
  //   const { data, isLoading } = useNotificationsQuery({});

  //   const notification: any = data?.data?.filter(
  //     (item: any) => item?.user?._id === userInfo?.id
  //   );

  //   const notificationLength = notification?.filter(
  //     (item: any) => item?.hasNotification === true
  //   ).length;

  const notification = [
    {
      notificationTitle: "New Notification",
      notificationBody: "This is a new notification",
      createdAt: new Date(),
    },
    {
      notificationTitle: "New Notification",
      notificationBody: "This is a new notification",
      createdAt: new Date(),
    },
    {
      notificationTitle: "New Notification",
      notificationBody: "This is a new notification",
      createdAt: new Date(),
    },
    {
      notificationTitle: "New Notification",
      notificationBody: "This is a new notification",
      createdAt: new Date(),
    },
    {
      notificationTitle: "New Notification",
      notificationBody: "This is a new notification",
      createdAt: new Date(),
    },
  ];

  const notificationLength = 5;

  return (
    <Popovers
      body={
        <div className="flex flex-col gap-2 px-1 ">
          {notification?.slice(0, 5).map((item: any, i: number) => (
            <Link
              key={i}
              href="#"
              className=" w-[350px] rounded-lg hover:bg-gray-100  gap-x-2 text-[inherit] no-underline outline-none focus-visible:ring-2 ring-pink-800 border-b-2 border hover:border-primary p-4"
            >
              <p className="text-gray-800 font-semibold ">
                {item?.notificationTitle}
              </p>

              <p className="text-sm overflow-hidden text-ellipsis line-clamp-2 mt-1 mb-0 col-span-2">
                {item?.notificationBody}
              </p>
              <p className="text-xs text-gray-500 col-span-2 py-2">
                {new Date(item?.createdAt).toLocaleTimeString()} ago
              </p>
            </Link>
          ))}
        </div>
      }
      title={"Notification"}
      trigger="click"
      open={isOpenNotification}
      setOpen={setIsOpenNotification}
      placement="bottom"
    >
      <Badge count={notificationLength}>
        <button
          type="button"
          className="flex-shrink-0 rounded-full  text-gray-400  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200 p-2 hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out"
        >
          <span className="sr-only">View notifications</span>
          <FaRegBell className="h-6 w-6" aria-hidden="true" />
        </button>
      </Badge>
    </Popovers>
  );
};

export default Notification;
