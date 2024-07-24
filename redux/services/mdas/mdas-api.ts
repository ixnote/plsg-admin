import { getValidAuthTokens } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mdasApi = createApi({
  reducerPath: "mdasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const { token } = getValidAuthTokens();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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

    getMdasDashboard: builder.query<any, any>({
      query: () => ({
        url: `statics/mda/dashboard`,
        method: "GET",
      }),
      providesTags: ["Mdas"],
    }),

    getAllMdas: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/mda/admin?page=${page}&pageSize=${pageSize}`,
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

export const {
  useCreateMdaMutation,
  useGetAllMdasQuery,
  useGetOneMdaQuery,
  useGetMdasDashboardQuery,
} = mdasApi;
