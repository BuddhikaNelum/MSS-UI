import { createApi } from "@reduxjs/toolkit/query/react";
import { TInventoryItemCreateRequest, TInventoryReportRequest } from "types/inventory";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: "/inventoryApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createInventoryItem: builder.mutation<any, TInventoryItemCreateRequest>({
      query: (data) => ({
        url: "/inventory/add",
        method: "POST",
        body: data,
      }),
    }),
    createInventoryReport: builder.mutation<Array<any>, TInventoryReportRequest>({
      query: (data) => ({
        url: "/report/inventoryreport",
        method: "POST",
        body: data,
      }),
    }),
    getInventory: builder.query<Array<any>, void>({
      query: () => `/inventory/all`,
    }),
    getInventoryItemById: builder.query<any, number>({
      query: (itemId) => `/inventory/${itemId}`,
    }),
  }),
});

export const {
  useLazyGetInventoryQuery,
  useLazyGetInventoryItemByIdQuery,
  useCreateInventoryItemMutation,
  useCreateInventoryReportMutation,
} = apiSlice;
