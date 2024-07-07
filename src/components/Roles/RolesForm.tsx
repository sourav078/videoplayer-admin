"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../shared/InputField";
import { Button } from "../ui/button";

import { Checkbox, Empty, message } from "antd";
import { useRouter } from "next/navigation";
import { useCreateRoleMutation } from "@/redux/features/roles";
import { ReactSelect } from "../ui/ReactSelect";
import { useGetPermissionsQuery } from "@/redux/features/permission";
import { useGetGroupsQuery } from "@/redux/features/groups";
import Loading from "@/app/loading";

type Props = {};

const RolesForm = (props: Props) => {
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const query: Record<string, any> = {};
  query["limit"] = 1000;
  query["page"] = 1;
  const { data: groups,isLoading:groupLoading } = useGetGroupsQuery({
    ...query,
  });

  const router = useRouter();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    // permissions: z.array(z.string()).nonempty("Permissions are required"),
  });

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string[] }>(
    {}
  );

  // Change the checkAll condition to check if every permission in every group is checked
  const checkAll = groups?.data?.data?.every(({ id, permission }: any) =>
    permission?.every((perm: any) => checkedItems[id]?.includes(perm.id))
  );

  // Update the onCheckAllChange function to check or uncheck all permissions and groups based on the current state
  const onCheckAllChange = (e: any) => {
    if (e.target.checked) {
      const newCheckedItems: { [key: string]: string[] } = {};
      groups?.data?.data?.forEach(({ id, permission }: any) => {
        newCheckedItems[id] = permission?.map(
          (permission: any) => permission?.id
        );
      });
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems({});
    }
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

  const onSubmit = async (data: ValidationSchemaType) => {
    const flattenedCheckedItems = Object.values(checkedItems).flat();
    if (flattenedCheckedItems.length === 0) {
      message.error("Please select permissions");
      return;
    }

    const modifiedData = {
      ...data,
      permissions: flattenedCheckedItems,
    };

    try {
      const res = await createRole(modifiedData).unwrap();

      if (res?.success) {
        message.success("roles created successfully");
        reset();
        setCheckedItems({});
        router.push("/roles/roles-list");
      } else {
        message.error(res?.data?.message || "Failed to create roles");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.data?.message || "Failed to create roles");
    }
  };

  if(groupLoading){
    return <Loading/>
  }




  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        label="Enter roles Name"
        name="name"
        register={register}
        required
        placeholder="Enter roles Name"
      />

      {/* permissions */}

      <section>
        <h3>
          <strong>Permissions</strong>
        </h3>

        {groups?.data?.data?.length > 0 ? (
          <>
            <div className="my-3 border-b pb-3 ">
              {/* check all */}
              <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                Check All
              </Checkbox>
            </div>

            {groups?.data?.data?.map((group: any) => (
              <div
                key={group?.id}
                className="my-3 border-b pb-3 flex gap-16 w-full"
              >
                {/* group  */}
                <h4 className="w-[30%]">
                  <Checkbox
                    checked={isGroupChecked(group?.id)}
                    onChange={(e) => onItemChange(group?.id, e.target.checked)}
                  >
                    {group?.name}
                  </Checkbox>
                </h4>

                {/* permission */}
                <div className="flex flex-col">
                  {group?.permission?.map((permission: any) => (
                    <div key={permission?.id} className="w-1/4">
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
                      >
                        {permission?.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <Empty description="No permission found" />
        )}
      </section>

      <Button isLoading={isLoading} type="submit">
        Create roles
      </Button>
    </form>
  );
};

export default RolesForm;
