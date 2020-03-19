import { createSlice, createAction } from "@reduxjs/toolkit";
import { mockConfig } from "./mock";

export const initialState = { noData: true };

export const updateTime = createAction("toTheStation/updateTime", payload => ({
  payload: {
    ...payload,
    currentTime: "2020-03-10T09:19:56+01:00" // new Date().toISOString()
  }
}));

export const slice = createSlice({
  name: "toTheStation",
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
    mockToTheStation: state => {
      Object.assign(state, mockConfig);
      state.noData = false;
    },
    chooseTrain: (state, action) => {
      const { trainDeparture } = action.payload;

      if (!trainDeparture) {
        state.station = null;
        state.train = null;
        state.noData = true;
        return;
      }
      state.currentTime = "2020-03-10T09:19:56+01:00"; // to move...
      state.station = {
        code: "SGL",
        name: "Saint-Germain-en-Laye",
        travelDurationSeconds: 625,
        onTimeMarginDelaySeconds: 20
      };
      state.train = {
        trainCode: trainDeparture.trainCode,
        departureTime: trainDeparture.departureTime,
        platform: trainDeparture.platform
      };
      state.noData = false;
    },
    updateTime: (state, action) => {
      const { currentTime } = action.payload;
      console.log("currentTime in updateTime", currentTime);
      state.currentTime = currentTime;
      state.noData = false;
    }
  }
});

export const { reset, mockToTheStation, chooseTrain } = slice.actions;

export default slice.reducer;
