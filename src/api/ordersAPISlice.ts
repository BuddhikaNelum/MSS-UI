import { createApi } from "@reduxjs/toolkit/query/react";
import { THotelRoom, THotelRoomCreate } from "types/hotelRoom";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/ordersApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    filterRoomsByHotelId: builder.query<Array<THotelRoom>, number>({
      query: (hotellId) => `/hotel/rooms/${hotellId}`
    }),
    getHotelRoomById: builder.query<any, number>({
      query: (roomlId) => `/hotel/room/${roomlId}`
    }),
    createHotelRoom: builder.mutation<THotelRoom, THotelRoomCreate>({
      query: (data) => ({
        url: '/hotel/addRoom',
        method: 'POST',
        body: data
      })
    }),
    updateHotelRoom: builder.mutation<any, THotelRoomCreate>({
      query: (data) => ({
        url: '/hotel/updateRoom',
        method: 'POST',
        body: data
      })
    }),
  }),
})

export const {
  useLazyFilterRoomsByHotelIdQuery,
  useLazyGetHotelRoomByIdQuery,
  useCreateHotelRoomMutation,
  useUpdateHotelRoomMutation
} = apiSlice;