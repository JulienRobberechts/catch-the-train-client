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
    update: (state, action) => {
      const { route } = action.payload;
      state.lastUpdate = moment.parseZone();
      state.route = route;
    }
  }
});

export const selectConfigIsValid = state => {
  return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = state => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};

export const { reset, mockTimeTable, update } = slice.actions;

export default slice.reducer;
