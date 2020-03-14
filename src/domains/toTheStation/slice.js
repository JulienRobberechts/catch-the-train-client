import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { mockConfig } from "./mock";
import { convertToTrainCode } from "../train";
import { getDelayStatus } from "../train";

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
        departureTime: "2020-03-10T09:32:00+01:00",
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

  const nowTime = moment.parseZone(state.toTheStation.currentTime);
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

  const travelData = calculateTravelData({
    nowTime,
    departure,
    waitingDelaySeconds,
    travelDurationSeconds,
    onTimeMarginDelaySeconds
  });
  // console.log({ travelData });
  return { ...travelData };
};

export const calculateTravelData = ({
  nowTime,
  departure,
  travelDurationSeconds,
  waitingDelaySeconds,
  onTimeMarginDelaySeconds
}) => {
  const targetTime = moment.parseZone(departure.departureTime);

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

export const {
  reset,
  mockToTheStation,
  chooseTrain,
  updateTime
} = slice.actions;

export default slice.reducer;
