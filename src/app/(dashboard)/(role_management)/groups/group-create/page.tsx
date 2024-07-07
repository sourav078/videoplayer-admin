import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import GroupForm from "@/components/groups/GroupForm";
import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Create Group",
  description: "Reensa E-commerce",
};

const CreateGroup = (props: Props) => {
  return (
    <main>
      <Breadcrumbs
        title="Create Group"
        pages={[
          { name: "Groups", href: "/groups/group-create", current: true },
        ]}
      />

      {/* form */}

      <GroupForm />
    </main>
  );
};

export default CreateGroup;
