import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import RolesForm from "@/components/Roles/RolesForm";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Create Role",
  description: "Reensa E-commerce",
};

const CreateRole = (props: Props) => {
  return (
    <main>
      <Breadcrumbs
        title="Create Role"
        pages={[{ name: "Role", href: "/roles/roles-create", current: true }]}
      />

      {/* form */}

      <RolesForm />
    </main>
  );
};

export default CreateRole;
