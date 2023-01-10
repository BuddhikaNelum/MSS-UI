import { createApi } from "@reduxjs/toolkit/query/react";
import { TDepartment, TDepartmentCreateRequest } from "types/department";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: "/departmentsApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getDepartments: builder.query<Array<TDepartment>, void>({
      query: () => `/department/all`,
    }),
    createDepartment: builder.mutation<any, TDepartmentCreateRequest>({
      query: (data) => ({
        url: "/department/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLazyGetDepartmentsQuery, useCreateDepartmentMutation } = apiSlice;
