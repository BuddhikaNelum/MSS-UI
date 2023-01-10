import { createApi } from "@reduxjs/toolkit/query/react";
import { TJobCreateRequest, TJobListResponse } from "types/job";
import { baseQueryWithReAuth } from "./interceptorsSlice";

export const apiSlice = createApi({
  reducerPath: "/jobsApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    createJob: builder.mutation<any, TJobCreateRequest>({
      query: (data) => ({
        url: "/job/create",
        method: "POST",
        body: data,
      }),
    }),
    getJobById: builder.query<any, number>({
      query: (jobId) => `/job/${jobId}`,
    }),
    getJobs: builder.query<TJobListResponse, void>({
      query: () => `/job/all`,
    }),
  }),
});

export const { useCreateJobMutation, useLazyGetJobByIdQuery, useLazyGetJobsQuery } = apiSlice;
