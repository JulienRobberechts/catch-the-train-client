import { createSlice, createAction } from "@reduxjs/toolkit";
import moment from "moment";
import config from "../../config";

const fakeNowString = config.MOCK_TIME
  ? "2020-03-10T09:22:30+01:00"
  : moment().format();

export const initialState = {
  currentTime: fakeNowString,
};

export const updateTime = createAction("toTheStation/updateTime", (payload) => {
  if (payload.calculateByInterval) {
    const lastTime = moment.parseZone(payload.lastTime);
    const duration = moment.duration({ milliseconds: payload.refreshInterval });
    const nextTime = lastTime.add(duration);
    const currentTime = nextTime.format();
    return { payload: { currentTime } };
  }
  const now = moment().format();
  return { payload: { currentTime: now } };
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
      state.currentTrainCode = action.payload;
    },
    updateTime: (state, action) => {
      state.currentTime = action?.payload?.currentTime;
    },
  },
});

export const { reset, chooseTrain } = slice.actions;

export default slice.reducer;
