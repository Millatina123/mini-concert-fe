import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listConcert: builder.query({
      providesTags: ["Concert"],
      query: () => ({
        url: "/user/payment",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
  }),
});

export const { useListConcertQuery } = paymentApi;
