import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockedTimeTable } from "./mock";

export const initialState = {};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    mockTimeTable: (state) => {
      state.route = mockedTimeTable.route;
    },
    fetch: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = "Error on fetch";
    },
    fetchSuccess: (state, action) => {
      const { payload } = action;
      console.log("fetchSuccess payload", payload);
      // TODO ...
      state.loading = false;
      state.error = null;
      state.data = payload;
    },
    update: (state, action) => {
      const { route } = action.payload;
      state.route = route;
    },
  },
});

export const {
  reset,
  mockTimeTable,
  fetch,
  fetchSuccess,
  fetchError,
  update,
} = slice.actions;

export default slice.reducer;
