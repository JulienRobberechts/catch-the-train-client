import { calculateTravelData } from "../toTheStation/pure"; // to move...
import moment from "moment";

export const selectConfigIsValid = state => {
  return true;
  // return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = state => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};

// Be careful with change of references!!!
export const selectEnhancedTimeTable = state => {
  if (!state.timeTable.route || state.toTheStation.noData) return null;

  const { timeTable } = state;
  const nowTime = moment.parseZone(state.toTheStation.currentTime);

  const {
    configuration: { waitingDelaySeconds },
    station: { travelDurationSeconds, onTimeMarginDelaySeconds }
  } = state.toTheStation;

  const trains = state.timeTable.route.trains.map((departure, index) => {
    const departureTime = moment.parseZone(departure.departureTime);
    const departureDuration = moment.duration(departureTime.diff(nowTime));

    const { delayStatus } = calculateTravelData({
      nowTime,
      departure,
      travelDurationSeconds,
      waitingDelaySeconds,
      onTimeMarginDelaySeconds
    });

    // const delayStatus = "ontime";
    // getDelayStatus(delayDuration, onTimeMarginDelaySeconds);
    return {
      index,
      departureTime,
      // trainCode,
      departureDuration,
      delayStatus
    };
  });

  return { route: timeTable.route, trains };
};
