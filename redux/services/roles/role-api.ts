import { getValidAuthTokens } from '@/lib/cookies';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleApi = createApi({
  reducerPath: 'roleApi',
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

  endpoints: (builder) => ({
    getAllRoles: builder.query<any, void>({
      query: () => ({
        url: '/roles',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllRolesQuery } = roleApi;
