import moment from "moment";
import { convertToTrainCode } from "../train";
import { calculateTravelData } from ".";

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
