import { createSlice } from "@reduxjs/toolkit";
import { mockConfig } from "./mock";

export const initialState = { noData: true };

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
      const { now } = action.payload;
      // state.currentTime = moment ( now )
      state.noData = false;
    }
  }
});

export const {
  reset,
  mockToTheStation,
  chooseTrain,
  updateTime
} = slice.actions;

export default slice.reducer;
