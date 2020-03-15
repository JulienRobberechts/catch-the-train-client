import moment from "moment";
import { getDelay } from "../toTheStation/pure";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

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
    const targetTime = moment.parseZone(departure.departureTime);
    const travelDuration = moment.duration({
      seconds: travelDurationSeconds
    });
    const waitingDuration = moment.duration({
      seconds: waitingDelaySeconds
    });

    const { targetDuration, delayDuration, delayStatus } = getDelay({
      nowTime,
      targetTime,
      travelDuration,
      waitingDuration,
      onTimeMarginDelaySeconds
    });

    return {
      index,
      departureTime,
      departureDuration,
      targetDuration,
      delayDuration,
      delayStatus
    };
  });

  return { route: timeTable.route, trains };
};
