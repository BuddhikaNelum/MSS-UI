import { createApi } from "@reduxjs/toolkit/query/react";
import { TJobAcceptRequest } from "types/job";
import { TOrder } from "types/order";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: "/ordersApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getOrders: builder.query<Array<TOrder>, void>({
      query: () => `/order/all`,
    }),
    requestFromInventory: builder.mutation<any, TJobAcceptRequest>({
      query: (data) => ({
        url: "/order/requestfrominventory",
        method: "POST",
        body: data,
      }),
    }),
    getOrderById: builder.query<any, number>({
      query: (orderId) => `/order/${orderId}`,
    }),
  }),
});

export const { useLazyGetOrdersQuery, useLazyGetOrderByIdQuery, useRequestFromInventoryMutation } = apiSlice;
