import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    signupPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupPending, signupSuccess, signupFailure } = signupSlice.actions;
export default signupSlice.reducer;
