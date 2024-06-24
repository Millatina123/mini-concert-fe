import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const historyConcertAdmin = createApi({
  reducerPath: "historyConcertAdmin",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listHistoryConcertAdmin: builder.query({
      query: () => ({
        url: "/history-concert-admin",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    detailConcert: builder.query({
      query: (id) => ({
        url: `/history-concert-admin/detail-concert/${id}`,
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
  }),
});

export const { useListHistoryConcertAdminQuery, useLazyDetailConcertQuery } = historyConcertAdmin;
