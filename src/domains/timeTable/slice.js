import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockedTimeTable } from "./mock";

export const initialState = { noData: true };

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
    mockTimeTable: state => {
      state.lastUpdate = moment.parseZone().format();
      state.route = mockedTimeTable.route;
      state.noData = false;
    },
    fetch: state => {
      // console.log("fetchRequested...");
      state.loading = true;
      state.error = null;
    },
    fetchError: state => {
      console.log("fetchError");
      state.loading = false;
      state.error = "Error on fetch";
    },
    fetchSuccess: (state, action) => {
      const { payload } = action;
      console.log("fetchSuccess payload", payload);
      // TODO ...
      state.loading = false;
      state.error = null;
      state.lastUpdate = moment.parseZone().format();
      state.route = payload.routes[0]; // first route
      state.noData = false;
    },
    update: (state, action) => {
      const { route } = action.payload;
      state.lastUpdate = moment.parseZone();
      state.route = route;
    }
  }
});

export const { reset, mockTimeTable, fetch, update } = slice.actions;

export default slice.reducer;
