import { getValidAuthTokens } from '@/lib/cookies';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log(token, 'from news api');

      //   const { token } = getValidAuthTokens();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
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

    getAllNews: builder.query<any, void>({
      query: () => ({
        url: '/news',
        method: 'GET',
      }),
      providesTags: ['News'],
    }),

    getOneNews: builder.query<any, any>({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'GET',
      }),
      providesTags: ['News'],
    }),
  }),
});

export const { useCreateNewsMutation, useGetAllNewsQuery, useGetOneNewsQuery } =
  newsApi;
