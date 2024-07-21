import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import dashboardReducer from "./features/dashboard/dashboard-slice";
import authReducer from "./features/auth/auth-slice";
import { authApi } from "./services/auth/auth-api";
import { roleApi } from "./services/roles/role-api";
import { userApi } from "./services/users/user-api";
import { newsApi } from "./services/news/news-api";
import { mdasApi } from "./services/mdas/mdas-api";
import { tagsApi } from "./services/tags/tags-api";
import { resourcesApi } from "./services/resources/resources-api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [mdasApi.reducerPath]: mdasApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [resourcesApi.reducerPath]: resourcesApi.reducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      roleApi.middleware,
      userApi.middleware,
      newsApi.middleware,
      mdasApi.middleware,
      tagsApi.middleware,
      resourcesApi.middleware,
    ]),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
