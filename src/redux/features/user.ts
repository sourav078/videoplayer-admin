import { api } from "../api/api";
import { tagTypes } from "../app/tag-types";

const userAuth = api.injectEndpoints({
  endpoints: (builder) => ({
    // create user
    createUser: builder.mutation({
      query: (body) => ({
        url: "/user/create-user",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // get users
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // get user by email
    getUserByEmail: builder.query({
      query: (email) => ({
        url: `/user/email/${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByEmailQuery,
} = userAuth;
