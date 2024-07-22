import { getValidAuthTokens } from '@/lib/cookies';
import { RootState } from '@/redux/store';
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

    getAllNews: builder.query<any, void>({
      query: () => ({
        url: '/news/admin/articles',
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
  useUpdateNewsMutation,
  useGetAllNewsQuery,
  useGetOneNewsQuery,
} = newsApi;
