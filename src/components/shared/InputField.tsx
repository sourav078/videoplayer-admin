"use client";
import React from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  customClass?: string;
  placeholder?: string;
  required?: boolean;
  register?: any;
  errors?: any;
  value?: string;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue?: any;
  readonly?: boolean;
}

const InputField = ({
  label,
  name,
  type,
  customClass,
  placeholder,
  required,
  register,
  errors,
  value,
  disabled,
  defaultValue,
  onChange,
  setValue,
  readonly = false,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleFileChange = async (e: any) => {
    const file = await e.target.files[0];
    await setValue(name, file);
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <div className="flex gap-1 items-center mb-1">
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
      {register && type !== "file" ? (
        <div className="relative text-gray-600 focus-within:text-gray-400">
          {type === "password" && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3   ">
              {showPassword ? (
                <EyeInvisibleOutlined
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-[#666666] cursor-pointer"
                />
              ) : (
                <EyeOutlined
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-5 h-5 text-[#666666] cursor-pointer"
                />
              )}
            </span>
          )}

          {errors && name && errors[name] && type !== "password" && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#DC2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}

          <input
            type={
              type === "password" && showPassword
                ? "text"
                : type
                ? type
                : "text"
            }
            placeholder={placeholder}
            disabled={disabled}
            id={name}
            readOnly={readonly}
            defaultValue={defaultValue ? defaultValue : null}
            className={`${
              customClass
                ? customClass
                : `${
                    errors && name && errors[name]
                      ? `border-1 w-full bg-red-50 rounded-[8px] outline-gray-600 py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize-600 text-gray-900 focus:outline-danger-600 border border-danger-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                          type === "password" ? "pr-10" : ""
                        }`
                      : ` w-full bg-gray-50  rounded-[8px]  border  border-[#A1A1A1] py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize-600 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 focus:outline-primary ${
                          type === "password" ? "pr-10" : ""
                        }`
                  }`
            }`}
            {...register(name ? name : "noName", {
              required: required ? true : false,
              valueAsNumber: type === "number" ? true : false,
            })}
            // if trigger then trigger the validation
          />
        </div>
      ) : register && type === "file" ? (
        <div className=" text-gray-600 focus-within:text-gray-400">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
            defaultValue={defaultValue ? defaultValue : null}
            readOnly={readonly}
            className={`${
              customClass
                ? customClass
                : errors && name && errors[name]
                ? "file_upload_input block w-full cursor-pointer bg-red-50 text-base leading-6 text-red-600 focus:outline-none focus:border-transparent rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
                : "file_upload_input block cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 w-full bg-[#F6F6F6] text-[#1A281F]"
            }`}
          />
        </div>
      ) : (
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          id={name}
          readOnly={readonly}
          className={`${
            customClass
              ? customClass
              : `${
                  errors?.name
                    ? "border-1 w-full bg-red-50 rounded-[8px] py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize-600 text-gray-900 focus:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
                    : "border w-full bg-gray-50 rounded-[8px] border-[#A1A1A1] py-2 px-[10px] font-inter text-sm leading-6 placeholder:capitalize-600 text-gray-900 focus:outline-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                }`
          }`}
          name={name}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? onChange : () => {}}
          required={required ? true : false}
        />
      )}
      {errors && name && errors[name] && (
        <p className="text-danger-700 text-[12px]">
          {errors[name].message ? errors[name].message : `${name} is required`}
        </p>
      )}
    </div>
  );
};

export default InputField;
