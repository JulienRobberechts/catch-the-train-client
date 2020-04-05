import { createSlice } from "@reduxjs/toolkit";
// import moment from "moment";
import { mockedTimeTable } from "./mock";

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
    update: (state, action) => {
      const { route } = action.payload;
      state.route = route;
    },
  },
});

export const { reset, fetch, fetchSuccess, fetchError, update } = slice.actions;

export default slice.reducer;
