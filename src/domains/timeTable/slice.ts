import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxStateTimeTable, RawDeparture } from "./types";
import { Journey } from "../journey/types";
export const initialState: ReduxStateTimeTable = {};

export const slice = createSlice({
  name: "timeTable",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    requestStart: (state, _action: PayloadAction<Journey>) => {
      state.loading = true;
      state.error = null;
      // we still can have data during the loading
    },
    requestError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      // we still can have data after an error
    },
    requestSuccess: (
      state,
      action: PayloadAction<{ departures: RawDeparture[] }>
    ) => {
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
