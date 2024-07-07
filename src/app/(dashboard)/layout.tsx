"use client";

import { Layout } from "antd";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";
import { userNavigation } from "@/constant/userNavigation";
import DashboardSideBar from "@/components/DashboardSideBar/DashboardSideBar";
import { UserNavigation } from "@/constant/dashboardItems";
import { useGetUserByEmailQuery } from "@/redux/features/user";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");

  const { data: session, status }: any = useSession();

  const pathname = usePathname();

  const { data, isLoading } = useGetUserByEmailQuery(email);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.data?.email) {
      setEmail(session?.user?.data?.email);
    }
  }, [session?.user?.data?.email, status]);

  return (
    <main className="bg-neutral-50 h-screen">
      <DashboardHeader
        setSidebarOpen={setSidebarOpen}
        userNavigation={userNavigation}
      />
      {/* header end */}
      <div className="bg-neutral-50 flex gap-6 lg:mx-6 lg:mt-4">
        <DashboardSideBar
          navigation={
            data?.data?.permissions && UserNavigation(data?.data?.permissions)
          }
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isLoading={isLoading || status === "loading"}
          pathname={pathname}
        />

        <div className=" w-full  flex flex-col  ">
          <div className="bg-white p-3 rounded-t-lg  ">{children}</div>
          <div className="border-t">
            <Layout.Footer
              style={{
                backgroundColor: "white",
              }}
              className="text-center  rounded-b-lg mt-3"
            >
              © {new Date().getFullYear()} Kids App
            </Layout.Footer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
