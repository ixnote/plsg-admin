import { getValidAuthTokens } from '@/lib/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createTracker: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    getAllUsers: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/user?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getAllAdminUsers: builder.query<any, void>({
      query: () => ({
        url: `/user?page=${1}&pageSize=${50}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getAdminDashboard: builder.query<any, void>({
      query: () => ({
        url: `/statics/admin/dashboard`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useCreateTrackerMutation,
  useGetAllUsersQuery,
  useGetAdminDashboardQuery,
  useGetAllAdminUsersQuery,
} = userApi;
