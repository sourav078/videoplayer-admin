"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../shared/InputField";
import { Button } from "../ui/button";
import { useCreateGroupMutation } from "@/redux/features/groups";
import { message } from "antd";
import { useRouter } from "next/navigation";

type Props = {};

const GroupForm = (props: Props) => {
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const router = useRouter();

  const schema = z.object({
    name: z.string().nonempty("Name is required"),
    // .regex(/^[a-zA-Z0-9\s]*$/, "Only alphanumeric characters are allowed"),
  });

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ValidationSchemaType) => {
    try {
      const res = await createGroup(data).unwrap();

      if (res?.success) {
        message.success("Group created successfully");
        router.push("/groups/group-list");
        reset();
      } else {
        message.error(res?.data?.message || "Failed to create group");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.data?.message || "Failed to create group");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        label="Enter Group Name"
        name="name"
        register={register}
        required
        placeholder="Enter Group Name"
      />

      <Button isLoading={isLoading} type="submit">
        Create Group
      </Button>
    </form>
  );
};

export default GroupForm;
