import { createSlice } from "@reduxjs/toolkit";
import { getMissions } from "../journey/service";
import { getJourney } from "../../adapters/journey";

export const initialState = {
  request: getJourney(),
};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setRequest: (state, action) => {
      const { network, line, departure, destination } = action.payload;
      const missions = getMissions(departure, destination).join(",");
      state.request = { network, line, departure, destination, missions };
    },
    requestStart: (state, action) => {
      state.loading = true;
      state.error = null;
      // state.request = action.payload;
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
  setRequest,
  requestStart,
  requestSuccess,
  requestError,
} = slice.actions;

export default slice.reducer;
