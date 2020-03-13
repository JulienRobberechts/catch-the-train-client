import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockedRoute } from "./mock";

export const slice = createSlice({
  name: "timeTable",
  initialState: {},
  reducers: {
    reset: state => {
      state = {};
    },
    mock: state => {
      state = {
        lastUpdate: new moment.utc().format(),
        route: mockedRoute
      };
    },
    update: (state, action) => {
      const { route } = action.payload;
      state.lastUpdate = new moment.utc();
      state.route = route;
    }
  }
});

export const selectConfigIsValid = state => {
  return true;
};

export const selectStationCode = state => {
  return state?.route?.station?.code;
};

export const selectTimeTable = state => {
  const { timeTable } = state;
  const nowTime = new moment.utc(new Date("2020-03-10T09:19:56Z"));

  const trains = state.timeTable.route.trains.map((t, index) => {
    const departureTime = new moment.utc(new Date(t.departureTime));
    const departureTimeCode = departureTime.format("hhmm");
    const departureDuration = moment.duration(departureTime.diff(nowTime));
    const delayStatus = "early";
    return {
      index,
      departureTime,
      departureTimeCode,
      departureDuration,
      delayStatus
    };
  });

  return { route: timeTable.route, trains };
};

export const { reset, mock, update } = slice.actions;

export default slice.reducer;
