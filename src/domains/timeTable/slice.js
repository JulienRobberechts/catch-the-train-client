import { createSlice } from "@reduxjs/toolkit";

import { loadJourney } from "../../adapters/journey";

export const initialState = {
  request: loadJourney(),
};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    requestStart: (state, action) => {
      state.loading = true;
      state.error = null;
      // we still can have data during the loading
    },
    requestError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
