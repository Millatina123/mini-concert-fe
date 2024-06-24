import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const historyCustomerApi = createApi({
  reducerPath: "historyCustomerApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    listHistoryConcertCustomer: builder.query({
      providesTags: ["TicketCustomer"],
      query: () => ({
        url: "/history-concert-customers",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    updateReviewRating: builder.mutation({
      query: (data) => ({
        url: `/history-concert-customers/update-review-rating/${data.id}`,
        method: "PUT",
        body: {
          rating: data.rating,
          review: data.review,
        },
        headers: {
          Authorization: "bearer " + localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["TicketCustomer"],
    }),
  }),
});

export const { useListHistoryConcertCustomerQuery, useUpdateReviewRatingMutation } = historyCustomerApi;
