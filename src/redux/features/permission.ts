import { api } from "../api/api";
import { tagTypes } from "../app/tag-types";

const permissionAuth = api.injectEndpoints({
  endpoints: (build) => ({
    // create permission
    createPermission: build.mutation({
      query: (data) => ({
        url: "/permission",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
    //   get all permission
    getPermissions: build.query({
      query: () => ({
        url: "/permission?limit=10000",
        method: "GET",
      }),
      providesTags: [tagTypes.permissions],
    }),
    // get permission by id
    getPermissionById: build.query({
      query: (id) => ({
        url: `/permission/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.permissions],
    }),
    // update permission
    updatePermission: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/permission/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.permissions],
    }),
    // delete permission
    deletePermission: build.mutation({
      query: (id) => ({
        url: `/permission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionAuth;
