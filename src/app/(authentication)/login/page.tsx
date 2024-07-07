"use client";
import InputField from "@/components/shared/InputField";
import { Checkbox, message } from "antd";
import Link from "next/link";
import React from "react";

import Logo from "@/assets/lerge_logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const Login = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const schema = z.object({
    email: z.string().nonempty({ message: "Invalid Phone / E-Mail address" }),
    password: z.string().nonempty({ message: "Password is required" }),
  });

  //extract the inferred type from schema
  type ValidationSchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ValidationSchemaType) => {
    setLoading(true);
    // check if data.email have @ then it is email otherwise mobile_number
    const isEmail = data.email.includes("@");

    const loginData = {
      password: data.password,
      [isEmail ? "email" : "mobile_number"]: data.email,
      redirect: false,
    };

    try {
      await signIn("kid-backend", loginData)
        .then(async ({ ok, error, ...data }: any) => {
          
          if (ok) {
            message.success("Login successful");
            router.push("/");
            setLoading(false);
            reset();
          } else {
            message.error(error || "Failed to login");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("🚀 ~ onSubmit ~ error:", error);
          setLoading(false);
          message.error(error?.data?.message || "Failed to login");
          // handle error here
        });
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      message.error(error?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="flex min-h-screen h-full px-4 w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="hidden sm:block h-56 w-56 text-primary absolute a-z-10 -left-20 -top-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#a)"
            />
          </svg>
        </div>
        <div className="hidden sm:block h-28 w-28 text-primary absolute a-z-10 -right-20 -bottom-20">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>
        {/* <!-- Register --> */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* <!-- Logo --> */}
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden bg-primary rounded-lg">
              <Image src={Logo} alt="logo" width={900} height={900} />
            </div>
            {/* <!-- /Logo --> */}
            <h4 className=" font-medium text-gray-700 xl:text-xl">
              Welcome to Kids APP !
            </h4>
            <p className="mb-6 text-gray-500">
              <small> Please sign-in to access your account</small>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              id=""
              className="mb-4"
              action="#"
              method="POST"
            >
              <InputField
                label="Phone / E-Mail"
                name="email"
                placeholder="Enter Phone / E-Mail"
                required={true}
                type="text"
                register={register}
                errors={errors}
              />

              <div className="mb-4">
                <div className="flex justify-between">
                  <label
                    className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="cursor-pointer text-primary no-underline hover:text-primary/60"
                  >
                    <small className=" ">Forgot Password?</small>
                  </Link>
                </div>

                <InputField
                  name="password"
                  placeholder="Enter your password"
                  required={true}
                  type="password"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="mb-4">
                <Checkbox>Remember Me</Checkbox>
              </div>
              <div className="mb-4">
                <Button type="submit" isLoading={loading} className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- /Register --> */}
      </div>
    </div>
  );
};

export default Login;
