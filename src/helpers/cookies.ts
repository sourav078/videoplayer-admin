"use server";
import { cookies } from "next/headers";

// get token from cookies
export const token = () => {
  const token = cookies().get("token");
  return token;
};

// set token to cookies
export const setToken = (token: string) => {
  cookies().set("token", token);
};

// remove token from cookies

export const removeToken = () => {
  cookies().delete("token");
};
