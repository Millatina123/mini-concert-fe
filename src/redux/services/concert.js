import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const concertApi = createApi({
  reducerPath: "concertApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listConcert: builder.query({
      providesTags: ["Concert"],
      query: () => ({
        url: "/concerts",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    addConcert: builder.mutation({
      query: (data) => ({
        url: "/concerts",
        method: "post",
        body: data,
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
      invalidatesTags: ["Concert"],
    }),
    concert: builder.query({
      providesTags: ["Concert"],
      query: (code) => ({
        url: "/concerts/" + code,
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
  }),
});

export const { useListConcertQuery, useAddConcertMutation, useConcertQuery } = concertApi;
