import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../app/tag-types";
import { axiosBaseQuery } from "@/helpers/axios/service";
import config from "@/config";
import { token } from "@/helpers/cookies";

// const token = getFromLocalStorage("token");

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${config?.apiBaseUrl}`,
  }),
  endpoints: (builder) => ({}),
  tagTypes: tagTypesList,
});
