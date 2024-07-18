import { getValidAuthTokens } from '@/lib/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const { token } = getValidAuthTokens();
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: {
            email,
            password,
          },
        };
      },
    }),

    getAuthData: builder.query<any, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAuthDataQuery } = authApi;
