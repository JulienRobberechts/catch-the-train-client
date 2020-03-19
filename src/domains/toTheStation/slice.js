import { createSlice, createAction } from "@reduxjs/toolkit";

export const initialState = {
  noData: true,
  userConfiguration: {
    onTimeMarginDelaySeconds: 20,
    timezone: "+01:00"
  }
};

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
        name: "Saint-Germain-en-Laye"
      };
      state.stationConfiguration = {
        travelDurationSeconds: 10 * 60 + 25,
        waitingDelaySeconds: 100
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

export const { reset, chooseTrain } = slice.actions;

export default slice.reducer;
