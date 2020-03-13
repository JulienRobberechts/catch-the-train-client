import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockConfig } from "./mock";
import { convertToTrainCode } from "../train";

export const slice = createSlice({
  name: "toTheStation",
  initialState: { noData: true },
  reducers: {
    reset: state => {
      state = {};
    },
    mockToTheStation: state => {
      Object.assign(state, mockConfig);
      state.noData = false;
    },
    chooseTrain: (state, action) => {
      const { station: stationCode, direction, trainCode } = action.payload;
      console.log({ stationCode, direction, trainCode });
      state.station = {
        code: stationCode.toUpperCase(),
        name: "Saint-Germain-en-Laye",
        travelDurationSeconds: 625,
        onTimeMarginDelaySeconds: 20
      };
      state.train = {
        direction: direction.toUpperCase(),
        departureTime: "2020-03-10T09:32:00Z", // redundant ?
        trainCode: trainCode,
        platform: "4"
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

export const selectNow = state => state?.toTheStation?.currentTime;

export const selectToTheStation = state => state?.toTheStation;

export const selectEnhancedToTheStation = state => {
  const { timeTable, toTheStation } = state;

  if (!state.timeTable.route || state.toTheStation.noData) return null;

  const nowTime = new moment.utc(new Date(state.toTheStation.currentTime));
  const trainCode = state.toTheStation.train.trainCode;

  const { trains } = timeTable.route;

  if (!trains) {
    return null;
  }

  const departureIndex = Math.max(
    trains.findIndex(
      departure => convertToTrainCode(departure.departureTime) === trainCode
    ),
    0
  );

  // console.log("departureIndex", departureIndex);
  const departure = trains[departureIndex];

  // second part
  // From the slice toTheStation

  const {
    configuration: { waitingDelaySeconds },
    station: { travelDurationSeconds, onTimeMarginDelaySeconds }
  } = toTheStation;

  const travelData = SelectTravelData({
    nowTime,
    departure,
    waitingDelaySeconds,
    travelDurationSeconds,
    onTimeMarginDelaySeconds
  });
  // console.log({ travelData });
  return { ...travelData };
};

const SelectTravelData = ({
  nowTime,
  departure,
  travelDurationSeconds,
  waitingDelaySeconds,
  onTimeMarginDelaySeconds
}) => {
  const targetTime = new moment.utc(new Date(departure.departureTime));

  const targetDuration = moment.duration(targetTime.diff(nowTime));

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds
  });

  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds
  });

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

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

const getDelayStatus = (delayDuration, onTimeMarginDelaySeconds) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (delayDurationSeconds > onTimeMarginDelaySeconds) return "early";
  if (delayDurationSeconds < -onTimeMarginDelaySeconds) return "late";
  return "ontime";
};

export const {
  reset,
  mockToTheStation,
  chooseTrain,
  updateTime
} = slice.actions;

export default slice.reducer;
