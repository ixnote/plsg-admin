import { getValidAuthTokens } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
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
  tagTypes: ["Resources"],
  endpoints: (builder) => ({
    createResource: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/resource/create",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Resources"],
    }),

    getAllResources: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/resource/all?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["Resources"],
    }),

    getOneResource: builder.query<any, any>({
      query: (id) => ({
        url: `/resource/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Resources"],
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetAllResourcesQuery,
  useGetOneResourceQuery,
} = resourcesApi;
