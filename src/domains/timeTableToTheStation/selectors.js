import moment from "moment";
import { calculateTravelData } from "../toTheStation/pure";

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

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.
