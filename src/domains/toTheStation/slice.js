import { createSlice, createAction } from "@reduxjs/toolkit";
import moment from "moment";

export const initialState = {
  noData: true,
  currentTime: "2020-03-10T09:19:56+01:00",
  userConfiguration: {
    onTimeMarginDelaySeconds: 20,
    timezone: "+01:00"
  }
};

export const updateTime = createAction("toTheStation/updateTime", payload => {
  console.log("payload", payload);
  const lastTime = moment(payload.lastTime);
  const duration = moment.duration({ milliseconds: payload.refreshInterval });
  const nextTime = lastTime.add(duration);
  const currentTime = nextTime.format();

  console.log("currentTime", currentTime);

  return {
    payload: {
      ...payload,
      currentTime
    }
  };
});

export const slice = createSlice({
  name: "toTheStation",
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
      state.currentTime = "2020-03-10T09:19:56+01:00";
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
