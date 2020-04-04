import moment from "moment";
import { getDelay, getDelayStatus } from "../toTheStation/pure";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

// Be careful with change of references!!!
export const selectEnhancedTimeTable = (state) => {
  if (!state.timeTable.data || state.toTheStation.noData) return null;

  const { timeTable } = state;
  const nowTime = moment.parseZone(state.toTheStation.currentTime);

  if (!state.toTheStation.station) {
    return null;
  }

  const {
    userConfiguration: { onTimeMarginDelaySeconds },
    stationConfiguration: { travelDurationSeconds, waitingDelaySeconds },
  } = state.toTheStation;

  const trains = state.timeTable.data.routes.map((departure, index) => {
    const departureTime = moment.parseZone(departure.departureTime);
    const departureDuration = moment.duration(departureTime.diff(nowTime));
    const targetTime = moment.parseZone(departure.departureTime);
    const travelDuration = moment.duration({
      seconds: travelDurationSeconds,
    });
    const waitingDuration = moment.duration({
      seconds: waitingDelaySeconds,
    });

    const trainCode = departure.trainCode;

    const { targetDuration, delayDuration } = getDelay({
      nowTime,
      targetTime,
      travelDuration,
      waitingDuration,
    });
    const delayStatus = getDelayStatus(delayDuration, onTimeMarginDelaySeconds);

    return {
      index,
      departureTime,
      departureDuration,
      targetDuration,
      delayDuration,
      delayStatus,
      trainCode,
    };
  });

  return { route: timeTable.route, trains };
};
