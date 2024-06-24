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
    updateLinkYtConcert: builder.mutation({
      query: (data) => ({
        url: `/setting-concerts/update-link-yt/${data.id}`,
        method: "PUT",
        body: {
          link_yt: data.link_yt,
        },
        headers: {
          Authorization: "bearer " + localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Concert"],
    }),
    stopConcert: builder.mutation({
      query: (data) => ({
        url: `/setting-concerts/stop-concert/${data.id}`,
        method: "PUT",
        body: {
          link_yt: data.link_yt,
        },
        headers: {
          Authorization: "bearer " + localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Concert"],
    }),
  }),
});

export const { useListSettingConcertQuery, useUpdateLinkYtConcertMutation, useStopConcertMutation } = settingConcertApi;
