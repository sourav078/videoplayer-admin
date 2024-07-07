"use client";

import Link from "next/link";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

import { Button } from "@/components/ui/button";

import { useGetRolesQuery } from "@/redux/features/roles";
import RolesTab from "@/components/Roles/RolesTab";
import Loading from "@/app/loading";
import { Empty } from "antd";

const RolesList = () => {
  //   search start

  const { data: roles, isLoading } = useGetRolesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Breadcrumbs
        pages={[
          { name: "Dashboard", href: "/", current: false },
          {
            name: "Roles List",
            href: "/roles/roles-list",
            current: true,
          },
        ]}
        title="Role List"
      />

      <div className="flex items-end justify-end gap-2">
        <div>
          <Link href="/roles/roles-create">
            <Button type="button">Create</Button>
          </Link>
        </div>
      </div>

      {roles?.data?.length === 0 ? (
        <div className="w-full my-4 mx-auto ">
          <Empty description="No Roles Found" />
        </div>
      ) : (
        <RolesTab data={roles?.data} />
      )}
    </div>
  );
};
export default RolesList;
