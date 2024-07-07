"use client";

import { FormField, FormItem } from "@/components/ui/form";
import { Select } from "antd";

import { Control, Controller } from "react-hook-form";

type Props = {
  control: Control<any>;
  name: string;
  label?: string;
  errors?: any;
  required?: boolean;
  placeholder: string;
  defaultValue?:
    | { value: string; label: string }
    | { value: string; label: string }[];
  data: { value: string; label: string }[];
  isMulti?: boolean;
};

export function ReactSelect({
  control,
  name,
  label,
  errors,
  required,
  placeholder,
  data,
  isMulti,
  defaultValue,
}: Props) {
  return (
    // if defaultValue then trigger the default value

    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="w-full mb-4 z-50">
          {label && (
            <div className="flex gap-1 items-center ">
              <label
                className={`flex items-center text-[14px] leading-6   capitalize ${
                  errors && name && errors[name]
                    ? "text-danger-700"
                    : "text-[#666] "
                }`}
                htmlFor={name}
              >
                {label}{" "}
                {required && (
                  <span
                    className={` ml-[4px] text-[14px] ${
                      errors && name && errors[name]
                        ? "text-danger-700"
                        : "text-red-500"
                    }`}
                  >
                    *
                  </span>
                )}
              </label>
            </div>
          )}

          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field }) => (
              <Select
                mode={isMulti ? "multiple" : undefined}
                status={errors && name && errors[name] ? "error" : undefined}
                showSearch={true}
                size="large"
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full  bg-gray-50  rounded-[8px]  border outline-none  border-[#A1A1A1] py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize-600 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 focus:outline-primary"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={data}
                {...field}
              />
            )}
          />

          {/* test end*/}

          {errors && name && errors[name] && (
            <p className="text-danger-700 text-[12px]">
              {errors[name].message
                ? errors[name].message
                : `${name} is required`}
            </p>
          )}
        </FormItem>
      )}
    />
  );
}
