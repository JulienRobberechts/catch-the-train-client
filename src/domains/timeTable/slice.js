import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    fetch: (state) => {
      state.loading = true;
      state.error = null;
      // we still can have data during the loading
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = "Error on fetch";
      // we still can have data after an error
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
  },
});

export const { reset, fetch, fetchSuccess, fetchError } = slice.actions;

export default slice.reducer;
