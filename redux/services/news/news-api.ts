import { getValidAuthTokens } from '@/lib/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getValidAuthTokens();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['News'],
  endpoints: (builder) => ({
    createNews: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '/news/add',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['News'],
    }),

    createNewsSection: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/news/section/add/${id}`,
          method: 'PUT',
          body: { ...rest },
        };
      },
      invalidatesTags: ['News'],
    }),

    deleteNewsSection: builder.mutation<any, any>({
      query: ({ id }) => {
        return {
          url: `/news/section/delete/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['News'],
    }),

    updateNews: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/news/update/${id}`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: ['News'],
    }),

    publishNews: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/news/update/${id}/publish`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: ['News'],
    }),

    updateReorderNewsSection: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/news/section/reorder/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: ['News'],
    }),

    getAllNews: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/news/admin/articles?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),

    getOneNews: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/news/${id}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useCreateNewsSectionMutation,
  useDeleteNewsSectionMutation,
  useUpdateReorderNewsSectionMutation,
  useUpdateNewsMutation,
  usePublishNewsMutation,
  useGetAllNewsQuery,
  useGetOneNewsQuery,
} = newsApi;
