"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../shared/InputField";
import { Button } from "../ui/button";

import { message } from "antd";
import { useRouter } from "next/navigation";
import { useCreatePermissionMutation } from "@/redux/features/permission";
import { ReactSelect } from "../ui/ReactSelect";
import { useGetGroupsQuery } from "@/redux/features/groups";

type Props = {};

const PermissionForm = (props: Props) => {
  const [createPermission, { isLoading }] = useCreatePermissionMutation();
  const { data: groups } = useGetGroupsQuery({
    limit: 1000,
  });


  
  console.log("🚀 ~ PermissionForm ~ groups:", groups);

  const router = useRouter();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    group_id: z.string().nonempty("Group is required"),
  });

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ValidationSchemaType) => {
    try {
      const res = await createPermission(data).unwrap();

      if (res?.success) {
        message.success("Permission created successfully");
        router.push("/permission/permission-list");
        reset();
      } else {
        message.error(res?.data?.message || "Failed to create permission");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.data?.message || "Failed to create permission");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        label="Enter permission Name"
        name="name"
        register={register}
        required
        placeholder="Enter permission Name"
      />

      <ReactSelect
        control={control}
        name="group_id"
        data={groups?.data?.data?.map((permission: any) => ({
          value: permission.id,
          label: permission.name,
        }))}
        errors={errors}
        label="Select Group"
        placeholder="Select Group"
        required
      />

      <Button isLoading={isLoading} type="submit">
        Create permission
      </Button>
    </form>
  );
};

export default PermissionForm;
