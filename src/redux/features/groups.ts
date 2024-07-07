import { api } from "../api/api";
import { tagTypes } from "../app/tag-types";

const groupsAuth = api.injectEndpoints({
  endpoints: (build) => ({
    // create group
    createGroup: build.mutation({
      query: (data) => ({
        url: "/permission-group",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
    // get all groups
    getGroups: build.query({
      query: ({ searchTerm }) => ({
        url: "/permission-group?limit=10000",
        method: "GET",
        params: searchTerm,
      }),
      providesTags: [tagTypes.groups],
    }),
    // get group by id
    getGroupById: build.query({
      query: (id) => ({
        url: `/permission-group/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.groups],
    }),
    // update group
    updateGroup: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/permission-group/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.groups],
    }),
    // delete group
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `/permission-group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.permissions, tagTypes.groups, tagTypes.roles],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsAuth;
