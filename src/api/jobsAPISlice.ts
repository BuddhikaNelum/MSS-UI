import { createApi } from "@reduxjs/toolkit/query/react";
import { TBooking, TBookingCheck, TBookingCreate, TPayLater } from "types/reservation";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/jobsApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    checkBooking: builder.mutation<boolean, TBookingCheck>({
      query: (data) => ({
        url: '/booking/check',
        method: 'POST',
        body: data
      })
    }),
    createBooking: builder.mutation<any, TBookingCreate>({
      query: (data) => ({
        url: '/booking/create',
        method: 'POST',
        body: data
      })
    }),
    filterReservations: builder.query<Array<TBooking>, void>({
      query: () => `/booking/getall`
    }),
    verifyPayment: builder.query<any, string>({
      query: (refId) => `/payment/complete/${refId}`
    }),
    payLater: builder.mutation<any, TPayLater>({
      query: (data) => ({
        url: '/booking/paylater',
        method: 'POST',
        body: data
      })
    })
  }),
})

export const {
  useCheckBookingMutation,
  useCreateBookingMutation,
  useLazyFilterReservationsQuery,
  useLazyVerifyPaymentQuery,
  usePayLaterMutation
} = apiSlice;