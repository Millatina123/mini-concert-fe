import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const settingConcertApi = createApi({
  reducerPath: "settingConcertApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listSettingConcert: builder.query({
      providesTags: ["Concert"],
      query: () => ({
        url: "/setting-concerts/list-setting-concert",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
  }),
});

export const { useListSettingConcertQuery } = settingConcertApi;
