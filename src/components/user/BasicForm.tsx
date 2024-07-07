import React from "react";
import InputField from "../shared/InputField";
import { ReactSelect } from "../ui/ReactSelect";
import {
  Control,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

type Props = {
  errors: any;
  register: any;
  control: Control<any>;
  roles: any;
  editUser: {
    email: string;
    first_name: string;
    last_name?: string;
    mobile_number: string;
    roles: string[];
  };
  setValue: UseFormSetValue<any>;
  setIsShowedPassword: (value: boolean) => void;
  isShowedPassword: boolean;
  reset: UseFormReset<any>;
  trigger: UseFormTrigger<any>;
};

const BasicForm = ({
  errors,
  register,
  editUser,
  control,
  roles,
  setIsShowedPassword,
  isShowedPassword,
  setValue,
  reset,
  trigger,
}: Props) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
        <InputField
          errors={errors}
          label="First Name"
          name="first_name"
          register={register}
          required
          placeholder="Enter user First Name"
          defaultValue={editUser?.first_name}
        />

        <InputField
          errors={errors}
          label="Last Name"
          name="last_name"
          register={register}
          placeholder="Enter user Last Name"
          defaultValue={editUser?.last_name}
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
          defaultValue={editUser?.email}
        />

        {/* mobile number */}
        <InputField
          errors={errors}
          label="Mobile Number"
          name="mobile_number"
          register={register}
          type="text"
          required
          placeholder="Enter user Mobile Number"
          defaultValue={editUser?.mobile_number}
        />
      </div>

      {
        <p
          className=" text-primary cursor-pointer text-sm underline underline-primary "
          onClick={() => {
            setIsShowedPassword(!isShowedPassword);
            reset({
              password: "",
              confirmPassword: "",
            });
            if (editUser?.roles?.length > 0) {
              const roles = editUser?.roles?.map((role: any) => role.id);
              setValue("roles", roles);
              trigger("roles");
            }
          }}
        >
          {isShowedPassword
            ? "Close Change Password Field"
            : "Open Change Password Field "}
        </p>
      }

      {isShowedPassword && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
          <InputField
            errors={errors}
            label="Password"
            name="password"
            register={register}
            type="password"
            placeholder="Enter user Password"
          />

          <InputField
            errors={errors}
            label="Confirm Password"
            name="confirmPassword"
            register={register}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      )}

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
        defaultValue={editUser?.roles?.map((role: any) => ({
          label: role.name,
          value: role.id,
        }))}
        required
        isMulti
      />
    </div>
  );
};

export default BasicForm;
