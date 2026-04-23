import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { globalApi } from './api/globalApi';
import authReducer from './features/authSlice';
import { createLogger } from 'redux-logger';

export const makeStore = () => {
  const logger = createLogger({
    collapsed: true,
  });

  return configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [globalApi.reducerPath]: globalApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(globalApi.middleware);
      if (process.env.NODE_ENV !== 'production') {
        return middleware.concat(logger);
      }
      return middleware;
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
