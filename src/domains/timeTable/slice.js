import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockedTimeTable } from "./mock";

export const slice = createSlice({
  name: "timeTable",
  initialState: { noData: true },
  reducers: {
    reset: state => {
      state = {};
    },
    mockTimeTable: state => {
      state.lastUpdate = new moment.utc().format();
      state.route = mockedTimeTable.route;
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
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};

// Be careful with change of references!!!
export const selectEnhancedTimeTable = state => {
  if (!state.timeTable.route || state.toTheStation.noData) return null;

  const { timeTable } = state;
  const nowTime = new moment.utc(new Date(state.toTheStation.currentTime));

  const trains = state.timeTable.route.trains.map((t, index) => {
    const departureTime = new moment.utc(new Date(t.departureTime));
    // const departureTimeCode = departureTime.format("hhmm");
    const departureDuration = moment.duration(departureTime.diff(nowTime));
    const delayStatus = "early";
    return {
      index,
      departureTime,
      // departureTimeCode,
      departureDuration,
      delayStatus
    };
  });

  return { route: timeTable.route, trains };
};

export const { reset, mockTimeTable, update } = slice.actions;

export default slice.reducer;
