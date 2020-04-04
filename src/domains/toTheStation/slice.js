import { createSlice, createAction } from "@reduxjs/toolkit";
import moment from "moment";
import config from "../../config";

const fakeNowString = config.MOCK_TIME
  ? "2020-03-10T09:22:30+01:00"
  : moment().format();

export const initialState = {
  noData: true,
  currentTime: fakeNowString,
  userConfiguration: {
    onTimeMarginDelaySeconds: 50,
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
        code: "Saint-Germain-en-Laye", // TODO
        name: "Saint-Germain-en-Laye", // TODO
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
