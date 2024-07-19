import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mdasApi = createApi({
  reducerPath: "mdasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Mdas"],
  endpoints: (builder) => ({
    createMda: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/mda/add",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Mdas"],
    }),

    getAllMdas: builder.query<any, void>({
      query: () => ({
        url: "/mda",
        method: "GET",
      }),
      providesTags: ["Mdas"],
    }),

    getOneMda: builder.query<any, any>({
      query: (id) => ({
        url: `/mda/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Mdas"],
    }),
  }),
});

export const { useCreateMdaMutation, useGetAllMdasQuery, useGetOneMdaQuery } =
  mdasApi;
