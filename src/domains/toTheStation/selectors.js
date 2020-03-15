import moment from "moment";
import { convertToTrainCode } from "../timeTable/pure";
import { getDelay, getDelayStatus } from "./pure";

export const selectNow = state => state?.toTheStation?.currentTime;

export const selectToTheStation = state => state?.toTheStation;

// TO MOVE ??
export const selectEnhancedToTheStation = state => {
  const { timeTable, toTheStation } = state; // MASHUP !!!!!!

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

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds
  });
  const targetTime = moment.parseZone(departure.departureTime);

  const { targetDuration, delayDuration } = getDelay({
    nowTime,
    targetTime,
    travelDuration,
    waitingDuration
  });
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
