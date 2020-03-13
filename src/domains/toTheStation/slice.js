import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockConfig } from "./mock";
import { timeCode } from "../../domains/timeTable/helpers";

export const slice = createSlice({
  name: "toTheStation",
  initialState: {},
  reducers: {
    reset: state => {
      state = {};
    },
    mock: state => {
      Object.assign(state, mockConfig);
    },
    updateTime: (state, action) => {
      const { now } = action.payload;
      // state.currentDate = moment ( now )
    }
  }
});

export const selectNow = state => state.currentDate;

export const selectData = state => {
  // As parameter ??
  const nowTime = new moment.utc(new Date("2020-03-10T09:19:56Z"));
  const departureTimeCode = "0924";

  // From the slice timeTable
  const { timeTable, toTheStation } = state;

  if (!timeTable.route) return null;

  const { trains } = timeTable.route;

  if (!trains) {
    return null;
  }

  const departureIndex = Math.max(
    trains.findIndex(
      departure => timeCode(departure.departureTime) === departureTimeCode
    ),
    0
  );

  // console.log("departureIndex", departureIndex);
  const departure = trains[departureIndex];

  // second part
  // From the slice toTheStation

  const {
    TravelDurationSeconds,
    WaitingDelaySeconds,
    OnTimeMarginDelaySeconds
  } = toTheStation;

  const travelData = SelectTravelData({
    nowTime,
    departure,
    TravelDurationSeconds,
    WaitingDelaySeconds,
    OnTimeMarginDelaySeconds
  });
  // console.log({ travelData });
  return { timeTable, ...travelData };
};

const SelectTravelData = ({
  nowTime,
  departure,
  TravelDurationSeconds,
  WaitingDelaySeconds,
  OnTimeMarginDelaySeconds
}) => {
  const targetTime = new moment.utc(new Date(departure.departureTime));

  const targetDuration = moment.duration(targetTime.diff(nowTime));

  const travelDuration = moment.duration({
    seconds: TravelDurationSeconds
  });

  const waitingDuration = moment.duration({
    seconds: WaitingDelaySeconds
  });

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayStatus = getDelayStatus({
    delayDuration,
    OnTimeMarginDelaySeconds
  });

  return {
    route: departure.route,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    waitingDuration,
    delayDuration,
    delayStatus
  };
};

const getDelayStatus = ({ delayDuration, OnTimeMarginDelaySeconds }) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (delayDurationSeconds > OnTimeMarginDelaySeconds) return "early";
  if (delayDurationSeconds < -OnTimeMarginDelaySeconds) return "late";
  return "ontime";
};

export const { reset, mock, updateTime } = slice.actions;

export default slice.reducer;
