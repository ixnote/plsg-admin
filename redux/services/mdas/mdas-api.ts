import { getValidAuthTokens } from '@/lib/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mdasApi = createApi({
  reducerPath: 'mdasApi',
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
  tagTypes: ['Mdas'],
  endpoints: (builder) => ({
    createMda: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: '/mda/add',
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Mdas'],
    }),

    updateMda: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/mda/update/mda?id=${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: ['Mdas'],
    }),

    assingAdminMda: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/mda/assign/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      // invalidatesTags: ['Mdas'],
    }),

    disabledAdminMda: builder.mutation<any, any>({
      query: ({ id, ...rest }) => {
        return {
          url: `/mda/unassign/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: ['Mdas'],
    }),

    getMdasDashboard: builder.query<any, any>({
      query: () => ({
        url: `statics/mda/dashboard`,
        method: 'GET',
      }),
      providesTags: ['Mdas'],
    }),

    getAllMdas: builder.query<any, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => ({
        url: `/mda/admin?page=${page}&pageSize=${pageSize}`,
        method: 'GET',
      }),
      providesTags: ['Mdas'],
    }),

    getOneMda: builder.query<any, any>({
      query: (payload) => ({
        url: `/mda/single/${payload.id}`,
        method: 'GET',
      }),
      providesTags: ['Mdas'],
    }),
  }),
});

export const {
  useCreateMdaMutation,
  useGetAllMdasQuery,
  useUpdateMdaMutation,
  useAssingAdminMdaMutation,
  useDisabledAdminMdaMutation,
  useGetOneMdaQuery,
  useGetMdasDashboardQuery,
} = mdasApi;
