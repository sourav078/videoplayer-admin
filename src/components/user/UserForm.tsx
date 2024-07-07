"use client";
import { useCreateUserMutation } from "@/redux/features/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../shared/InputField";
import { Button } from "../ui/button";
import { useGetRolesQuery } from "@/redux/features/roles";
import { ReactSelect } from "../ui/ReactSelect";

type Props = {};

const UserForm = (props: Props) => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { data: roles } = useGetRolesQuery(undefined);

  const router = useRouter();

  const schema = z
    .object({
      first_name: z.string().nonempty("First Name is required"),
      last_name: z.string().optional(),

      email: z.string().email("Invalid email").nonempty("Email is required"),
      password: z.string().nonempty("Password is required"),
      confirmPassword: z.string().nonempty("Confirm Password is required"),
      mobile_number: z.number({
        invalid_type_error: "Mobile number is required",
        message: "Mobile number is required",
        required_error: "Mobile number is required",
      }),
      roles: z.array(
        z.string({
          message: "Role is required",
          invalid_type_error: "Role is required",
          required_error: "Role is required",
        })
      ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
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

  const onSubmit = async (data: ValidationSchemaType) => {
    const { confirmPassword, ...rest } = data;

    const updatedData = {
      ...rest,
      mobile_number: data.mobile_number.toString(),
    };

    try {
      const res = await createUser(updatedData).unwrap();

      if (res?.success) {
        message.success("user created successfully");
        router.push("/users/user-list");
        reset();
      } else {
        message.error(res?.data?.message || "Failed to create user");
      }
    } catch (error: any) {
      console.error(error);
      message.error(error?.data?.message || "Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
          <InputField
            errors={errors}
            label="First Name"
            name="first_name"
            register={register}
            required
            placeholder="Enter user First Name"
          />

          <InputField
            errors={errors}
            label="Last Name"
            name="last_name"
            register={register}
            placeholder="Enter user Last Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
          <InputField
            errors={errors}
            label="Email"
            name="email"
            register={register}
            required
            placeholder="Enter user Email"
          />

          {/* mobile number */}
          <InputField
            errors={errors}
            label="Mobile Number"
            name="mobile_number"
            register={register}
            type="number"
            required
            placeholder="Enter user Mobile Number"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
          <InputField
            errors={errors}
            label="Password"
            name="password"
            register={register}
            required
            type="password"
            placeholder="Enter user Password"
          />

          <InputField
            errors={errors}
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            required
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <ReactSelect
          control={control}
          data={roles?.data?.map((role: any) => ({
            label: role.name,
            value: role.id,
          }))}
          name="roles"
          label="Roles"
          placeholder="Select Multi Roles"
          errors={errors}
          required
          isMulti
        />
      </div>

      <Button isLoading={isLoading} type="submit">
        Create user
      </Button>
    </form>
  );
};

export default UserForm;
