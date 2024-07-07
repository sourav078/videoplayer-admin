import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import UserForm from "@/components/user/UserForm";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Create user",
  description: "Reensa E-commerce",
};

const UserCreate = (props: Props) => {
  return (
    <main>
      <Breadcrumbs
        title="Create user"
        pages={[{ name: "User", href: "/users/user-create", current: true }]}
      />

      {/* form */}
      <UserForm />
    </main>
  );
};

export default UserCreate;
