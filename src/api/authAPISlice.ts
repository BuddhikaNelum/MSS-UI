import { createApi } from "@reduxjs/toolkit/query/react";
import { TSignInRequest, TSignInResponse, TSignUpRequest } from "types/auth";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    signUp: builder.mutation<void, TSignUpRequest>({
      query: (data) => ({
        url: '/user/signup',
        method: 'POST',
        body: data
      })
    }),
    signIn: builder.mutation<TSignInResponse, TSignInRequest>({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data
      })
    })
  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
} = apiSlice;