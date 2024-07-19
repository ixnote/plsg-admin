import { setCookie, deleteCookie } from 'cookies-next';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '@/redux/services/auth/auth-api';
// store/auth.ts
const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 60 * 60,
    path: '/',
    // more security options here
    // sameSite: 'strict',
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
  });
};

type LoginResponse = {
  token: string | null;
  refreshToken: string | null;
  user: any;
};

const initialState: Partial<LoginResponse> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie('auth_token');
      deleteCookie('auth_token');
      state.token = null;
      state.user = null;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    setTokens: (state, action: PayloadAction<any>) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          // set the token in the cookies

          setAuthCookie(payload.data.tokens.accessToken, 'auth_token');
          setAuthCookie(payload.data.tokens.refreshToken, 'refresh_auth_token');

          _state.token = payload.data.tokens.accessToken;
          _state.refreshToken = payload.data.tokens.refreshToken;

          // "mutation" also works
          // state = payload;

          // return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          // in case we receive a new token when refetching the details
          // setAuthCookie(payload.token, 'auth_token');
          _state.user = payload.data;
        }
      );
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
