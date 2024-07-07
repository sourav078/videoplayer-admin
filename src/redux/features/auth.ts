import { api } from "../api/api";

const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
    }),
    // admin login
    adminLogin: builder.mutation({
      query: (body) => {
        return {
          url: "/auth/admin-login",
          method: "POST",
          data: body,
        };
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAdminLoginMutation } =
  auth;
