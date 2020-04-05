import { createSlice } from "@reduxjs/toolkit";

export const initialState = {};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      // we still can have data during the loading
    },
    requestError: (state) => {
      state.loading = false;
      state.error = "Error on fetch"; // better error mgt
      // we still can have data after an error
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
  },
});

export const {
  reset,
  requestStart,
  requestSuccess,
  requestError,
} = slice.actions;

export default slice.reducer;
