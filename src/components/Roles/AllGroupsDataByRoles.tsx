"use client";
import Loading from "@/app/loading";
import { useGetGroupsQuery } from "@/redux/features/groups";
import { Checkbox, message } from "antd";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useUpdateRoleMutation } from "@/redux/features/roles";

type Props = {
  permissions: {
    id: string;
    name: string;

    group_id: string;
  }[];
  roleId: string;
};

const AllGroupsDataByRoles = ({ permissions, roleId }: Props) => {
  const [updateRole, { isLoading: updateLoading }] = useUpdateRoleMutation();

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string[] }>(
    permissions.reduce((acc: any, { group_id, id }: any) => {
      if (acc[group_id]) {
        acc[group_id].push(id);
      } else {
        acc[group_id] = [id];
      }
      return acc;
    }, {})
  );

  // get groups
  const { data: groups, isLoading } = useGetGroupsQuery({
    limit: 1000,
  });

  // Update the condition to check if a group checkbox should be checked or not
  // Now it checks if all permissions of a group are checked
  const isGroupChecked = (groupId: string) => {
    const group = groups?.data?.data?.find(
      (group: any) => group.id === groupId
    );
    return group?.permission?.every((permission: any) =>
      checkedItems[groupId]?.includes(permission.id)
    );
  };

  const onItemChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      if (checked) {
        const newCheckedItems = { ...prev };
        newCheckedItems[id] =
          groups?.data?.data
            ?.find((item: any) => item.id === id)
            ?.permission?.map((permission: any) => permission?.id) || [];
        return newCheckedItems;
      } else {
        const newCheckedItems = { ...prev };
        delete newCheckedItems[id];
        return newCheckedItems;
      }
    });
  };

  // Update the onPermissionChange function to check or uncheck a group checkbox based on the state of its permissions
  const onPermissionChange = (
    groupId: string,
    permissionId: string,
    checked: boolean
  ) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      if (checked) {
        if (newCheckedItems[groupId]) {
          newCheckedItems[groupId].push(permissionId);
        } else {
          newCheckedItems[groupId] = [permissionId];
        }
      } else {
        newCheckedItems[groupId] = newCheckedItems[groupId].filter(
          (permId) => permId !== permissionId
        );
        if (newCheckedItems[groupId].length === 0) {
          delete newCheckedItems[groupId];
        }
      }
      return newCheckedItems;
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdate = async () => {
    const flattenedCheckedItems = Object.values(checkedItems).flat();
    if (flattenedCheckedItems.length === 0) {
      message.error("Please select permissions");
      return;
    }

    const data = {
      id: roleId,
      permissions: flattenedCheckedItems,
    };

    try {
      const res = await updateRole(data).unwrap();

      if (res?.success) {
        message.success("Roles updated successfully");
      } else {
        message.error(res?.data?.message || "Failed to update roles");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.data?.message || "Failed to update roles");
    }
  };

  return (
    <>
      <section className="flex flex-wrap gap-4">
        {groups?.data?.data?.map((group: any, index: number) => {
          return (
            <div key={index} className="border px-4 py-2 rounded-lg">
              <div>
                <h1>
                  <strong>{group.name}</strong>
                </h1>
                {/* check all -group */}
                <Checkbox
                  checked={isGroupChecked(group?.id)}
                  onChange={(e) => onItemChange(group?.id, e.target.checked)}
                >
                  Select All
                </Checkbox>
              </div>
              <hr className="my-2 border-1" />
              {/* permission */}

              <div className="flex flex-col gap-2">
                {group?.permission.map((permission: any, index: number) => {
                  return (
                    <Checkbox
                      checked={
                        checkedItems[group?.id]?.includes(permission.id) ||
                        false
                      }
                      onChange={(e) => {
                        onPermissionChange(
                          group?.id,
                          permission.id,
                          e.target.checked
                        );
                        // field.onChange(e.target.checked);
                      }}
                      key={index}
                    >
                      {permission.name}
                    </Checkbox>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
      <Button
        isLoading={updateLoading}
        type="button"
        onClick={handleUpdate}
        className="mt-4"
      >
        Update
      </Button>
    </>
  );
};

export default AllGroupsDataByRoles;
