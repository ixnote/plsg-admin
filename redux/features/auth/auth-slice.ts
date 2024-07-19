import { setCookie, deleteCookie } from 'cookies-next';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/redux/services/auth/auth-api';
// store/auth.ts
const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

type LoginResponse = {
  token: string | null;
  user: any;
};

const initialState: Partial<LoginResponse> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie('auth_token');
      state.token = null;
      state.user = null;
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // set the token in the cookies
          setAuthCookie(payload.data.tokens.accessToken, 'auth_token');

          _state.user = payload.data;

          // "mutation" also works
          // state = payload;
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          // in case we receive a new token when refetching the details
          // setAuthCookie(payload.token, 'auth_token');
          console.log(payload, 'fullfiled');
          _state.user = payload.data;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
