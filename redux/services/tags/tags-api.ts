import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getValidAuthTokens();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    createTags: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/tags/add",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Tags"],
    }),

    getAllTags: builder.query<any, void>({
      query: () => ({
        url: "/tag/news",
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),

    getAllTopicTags: builder.query<any, void>({
      query: () => ({
        url: "/tag/topics",
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),

    getAllTypeTags: builder.query<any, void>({
      query: () => ({
        url: "/tag/types",
        method: "GET",
      }),
      providesTags: ["Tags"],
    }),
  }),
});

export const {
  useCreateTagsMutation,
  useGetAllTagsQuery,
  useGetAllTopicTagsQuery,
  useGetAllTypeTagsQuery,
} = tagsApi;
