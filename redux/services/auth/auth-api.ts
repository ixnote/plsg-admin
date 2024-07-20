import { getValidAuthTokens } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const { token } = getValidAuthTokens();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: {
            email,
            password,
          },
        };
      },
    }),
    getAuthData: builder.query<any, { token: string }>({
      query: ({ token }) => ({
        url: "/auth/profile",
        // this is the default but I'm leaving it here for reference
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createUsers: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/auth/create",
          method: "POST",
          body: body,
        };
      },
      // invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetAuthDataQuery, useCreateUsersMutation } =
  authApi;
