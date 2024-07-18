import { setCookie, deleteCookie } from 'cookies-next';
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/redux/services/auth/auth-api';

type LoginResponse = {
  token: string;
  user: any;
};

const initialState: Partial<LoginResponse> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      // deleteCookie('auth_token');
      // clear the auth slice data
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // store the user data in the store
          _state.user = payload.data;
          _state.token = payload.data.tokens.accessToken;
          // "mutation" also works
          // state = payload;
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
