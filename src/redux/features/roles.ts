import { api } from "../api/api";
import { tagTypes } from "../app/tag-types";

const roleAuth = api.injectEndpoints({
  endpoints: (build) => ({
    // create role
    createRole: build.mutation({
      query: (data) => ({
        url: "/user-role",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
    // get all roles
    getRoles: build.query({
      query: () => ({
        url: "/user-role?limit=10000",
        method: "GET",
      }),
      providesTags: [tagTypes.roles],
    }),
    // get role by id
    getRoleById: build.query({
      query: (id) => ({
        url: `/user-role/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.roles],
    }),
    // update role
    updateRole: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/user-role/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.permissions,
        tagTypes.groups,
        tagTypes.roles,
        tagTypes.user,
      ],
    }),
    // delete role
    deleteRole: build.mutation({
      query: (id) => ({
        url: `/user-role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleAuth;
