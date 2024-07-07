"use client";
import React from "react";

type Props = {
  data: {
    id: string;
    name: string;
    permissions: {
      id: string;
      name: string;

      group_id: string;
    }[];
  }[];
};

import { Tab } from "@headlessui/react";
import AllGroupsDataByRoles from "./AllGroupsDataByRoles";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const RolesTab = ({ data }: Props) => {
  return (
    <div className="w-full  px-2 py-4 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 flex-wrap rounded-xl bg-white p-1 border ">
          {data?.map((role, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                classNames(
                  "w-full max-w-48 rounded-lg border py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2  focus:outline-none focus:ring-2",
                  selected
                    ? "bg-primary text-white shadow"
                    : "text-base-black hover:bg-base-gray hover:text-white"
                )
              }
            >
              {role?.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {data?.map((role, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames("rounded-xl bg-white p-3")}
            >
              <AllGroupsDataByRoles
                permissions={role?.permissions}
                roleId={role?.id}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default RolesTab;
