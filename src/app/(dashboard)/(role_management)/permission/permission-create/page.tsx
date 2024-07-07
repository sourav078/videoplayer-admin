import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PermissionForm from "@/components/Permission/PermissionForm";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Create Permission",
  description: "Reensa E-commerce",
};

const CreatePermission = (props: Props) => {
  return (
    <main>
      <Breadcrumbs
        title="Create permission"
        pages={[
          {
            name: "Permission",
            href: "/permission/permission-create",
            current: true,
          },
        ]}
      />

      {/* form */}

      <PermissionForm />
    </main>
  );
};

export default CreatePermission;
