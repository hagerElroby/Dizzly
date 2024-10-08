import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';
import loginSlice from './loginSlice';

export const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice

  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;