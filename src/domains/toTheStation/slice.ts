import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import config from "../../config";
import { ReduxStateToTheStation } from "./types";
const fakeNowString = config.MOCK_TIME
  ? "2020-03-10T09:22:30+01:00"
  : moment().format();

export const initialState: ReduxStateToTheStation = {
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
    reset: (state: ReduxStateToTheStation) => {
      Object.assign(state, initialState);
      state.currentTime = fakeNowString;
    },
    chooseTrain: (
      state: ReduxStateToTheStation,
      action: PayloadAction<string | undefined>
    ) => {
      state.currentTrainCode = action.payload;
    },
    updateTime: (
      state: ReduxStateToTheStation,
      action: PayloadAction<{ currentTime: string }>
    ) => {
      state.currentTime = action?.payload?.currentTime;
    },
  },
});

export const { reset, chooseTrain } = slice.actions;

export default slice.reducer;
