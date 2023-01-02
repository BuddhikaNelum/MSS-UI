import { createApi } from "@reduxjs/toolkit/query/react";
import { TEmployeeCreate } from "types/employee";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: '/employeesApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    filterEmployees: builder.query<any, void>({
      query: () => `/manager/getall`
    }),
    getEmployeeById: builder.query<any, number>({
      query: (empId) => `/manager/clerk/${empId}`
    }),
    createEmployee: builder.mutation<any, TEmployeeCreate>({
      query: (data) => ({
        url: '/manager',
        method: 'POST',
        body: data
      })
    }),
  })
})

export const {
  useLazyFilterEmployeesQuery,
  useLazyGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
} = apiSlice;