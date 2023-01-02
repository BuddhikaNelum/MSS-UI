import { createApi } from "@reduxjs/toolkit/query/react";
import { TSignInRequest, TSignInResponse, TSignUpRequest } from "types/auth";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    signUp: builder.mutation<void, TSignUpRequest>({
      query: (data) => ({
        url: '/auth',
        method: 'POST',
        body: data
      })
    }),
    signIn: builder.mutation<TSignInResponse, TSignInRequest>({
      query: (data) => ({
        url: '/auth/signin',
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