"use client";
import React from "react";

type Props = {};

//  i have a list of roles and permissions.
const roles = [
  {
    name: "customer",
    permissions: [
      {
        name: "dashboard.view",
      },
    ],
  },
  {
    name: "user",
    permissions: [
      {
        name: "dashboard.update",
      },
    ],
  },
];

const permissions = [
  {
    name: "user.delete",
  },
  {
    name: "user.update",
  },
  {
    name: "user.view",
  },
];

// i want output like this [
// { name: "dashboard.view"},{name: "dashboard.update"},{name: "user.delete"},{name: "user.update"},{name: "user.view"}]

const getPermissions = (roles: any, permissions: any) => {
  const rolesPermissions = roles.flatMap((role: any) => role.permissions);
  const allPermissions = [...rolesPermissions, ...permissions];
  return allPermissions;
};

console.log(getPermissions(roles, permissions));

const page = (props: Props) => {
  return <div>page</div>;
};

export default page;
