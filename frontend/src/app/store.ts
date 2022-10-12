import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authReducer';
import loggedReducer from '../features/logged/loggedReducer';
import watchListReducer from '../features/watchList/watchListReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    watchList: watchListReducer,
    logged: loggedReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
