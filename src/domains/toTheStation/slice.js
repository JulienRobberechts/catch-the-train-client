import { createSlice, createAction } from "@reduxjs/toolkit";
import moment from "moment";

const fakeNow = moment();
fakeNow.set({ hour: 9, minute: 22, second: 30, millisecond: 123 });
const fakeNowString = fakeNow.format();

export const initialState = {
  noData: true,
  currentTime: fakeNowString,
  userConfiguration: {
    onTimeMarginDelaySeconds: 20,
    timezone: "+01:00",
  },
};

export const updateTime = createAction("toTheStation/updateTime", (payload) => {
  console.log("payload", payload);
  const lastTime = moment(payload.lastTime);
  const duration = moment.duration({ milliseconds: payload.refreshInterval });
  const nextTime = lastTime.add(duration);
  const currentTime = nextTime.format();

  console.log("currentTime", currentTime);

  return {
    payload: {
      ...payload,
      currentTime,
    },
  };
});

export const slice = createSlice({
  name: "toTheStation",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
      state.currentTime = fakeNowString;
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
        name: "Saint-Germain-en-Laye",
      };
      state.stationConfiguration = {
        travelDurationSeconds: 10 * 60 + 25,
        waitingDelaySeconds: 100,
      };
      state.train = {
        ...trainDeparture,
      };
      state.noData = false;
    },
    updateTime: (state, action) => {
      const { currentTime } = action.payload;
      console.log("currentTime in updateTime", currentTime);
      state.currentTime = currentTime;
      state.noData = false;
    },
  },
});

export const { reset, chooseTrain } = slice.actions;

export default slice.reducer;
