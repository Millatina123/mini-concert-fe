import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: "auth/verify-token",
        method: "get",
        headers: { Authorization: token },
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyTokenMutation, useLoginMutation } = authApi;
