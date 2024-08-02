import { getValidAuthTokens } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const governmentApi = createApi({
  reducerPath: "governmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getValidAuthTokens();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Government"],
  endpoints: (builder) => ({
    createGovernment: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/statics/government/add",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Government"],
    }),

    updateGovernment: builder.mutation<any, any>({
      query: ({ id, body }) => {
        return {
          url: `/statics/government/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["Government"],
    }),

    getGovernment: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/statics/governments?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Government"],
    }),

    getAGovernment: builder.query<any, any>({
      query: ({ governmentId }) => ({
        url: `statics/government/${governmentId}`,
        method: "GET",
      }),
      providesTags: ["Government"],
    }),
  }),
});

export const {
  useCreateGovernmentMutation,
  useUpdateGovernmentMutation,
  useGetGovernmentQuery,
  useGetAGovernmentQuery,
} = governmentApi;
