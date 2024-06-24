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
    listTicketCustomer: builder.query({
      providesTags: ["TicketCustomer"],
      query: () => ({
        url: "/user/payment/list-ticket-customer",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    listVerifyPayments: builder.query({
      providesTags: ["Payments"],
      query: () => ({
        url: "/user/payment/list-verify-payment",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    historyPayment: builder.query({
      providesTags: ["HistoryPayment"],
      query: () => ({
        url: "/user/payment/history-payment",
        method: "get",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "/user/payment",
        method: "post",
        body: data,
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
      invalidatesTags: ["Concert"],
    }),
    verifyPayment: builder.mutation({
      query: ({ id }) => ({
        url: `/user/payment/verify/${id}`,
        method: "post",
        headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const { useListConcertQuery, useCreatePaymentMutation, useHistoryPaymentQuery, useListVerifyPaymentsQuery, useVerifyPaymentMutation, useListTicketCustomerQuery } = paymentApi;
