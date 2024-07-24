import { getValidAuthTokens } from "@/lib/cookies";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
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
  tagTypes: ["News"],
  endpoints: (builder) => ({
    createNews: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/news/add",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["News"],
    }),

    updateNews: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/news/update/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["News"],
    }),

    getAllNews: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/news/admin/articles?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),

    getOneNews: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/news/${id}`,
        method: "GET",
      }),
      providesTags: ["News"],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useGetAllNewsQuery,
  useGetOneNewsQuery,
} = newsApi;
