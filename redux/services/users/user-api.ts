import { getValidAuthTokens } from '@/lib/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const { token } = getValidAuthTokens();
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createTracker: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '/users',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['User'],
    }),

    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const { useCreateTrackerMutation, useGetAllUsersQuery } = userApi;
