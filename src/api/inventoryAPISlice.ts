import { createApi } from "@reduxjs/toolkit/query/react";
import { THotel, THotelCreate } from "types/hotel";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/inventoryApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    filterHotels: builder.query<Array<THotel>, void>({
      query: () => `/hotel/all`
    }),
    getHotelById: builder.query<any, number>({
      query: (hotelId) => `/hotel/${hotelId}`
    }),
    createHotel: builder.mutation<any, THotelCreate>({
      query: (data) => ({
        url: '/hotel/add',
        method: 'POST',
        body: data
      })
    }),
    updateHotel: builder.mutation<any, THotelCreate>({
      query: (data) => ({
        url: '/hotel/update',
        method: 'POST',
        body: data
      })
    }),
  }),
})

export const {
  useLazyFilterHotelsQuery,
  useLazyGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation
} = apiSlice;