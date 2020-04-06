import moment from "moment";
import { getDelay, getDelayStatus } from "../toTheStation/pure";

import { selectAllDepartures } from "../timeTable/selectors";

import {
  selectNow,
  selectUserConfiguration,
  selectStationConfiguration,
  selectCurrentTrainCode,
} from "../toTheStation/selectors";

// those selectors are a mashup of timeTable and toTheStation
// in order to provide a ready to use selectors for the timeLine component.

// Be careful with change of references!!!
export const selectEnhancedTimeTable = (state) => {
  const currentTime = selectNow(state);
  // const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const departures = selectAllDepartures(state);

  if (!departures || !stationConfiguration) return null;

  const { timeTable } = state;
  const nowTime = moment.parseZone(currentTime);

  const { onTimeMarginDelaySeconds } = userConfiguration;
  const { travelDurationSeconds, waitingDelaySeconds } = stationConfiguration;

  // const {
  //   userConfiguration: { onTimeMarginDelaySeconds },
  //   stationConfiguration: { travelDurationSeconds, waitingDelaySeconds },
  // } = state.toTheStation;

  const trains = departures.map((departure, index) => {
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

  return { route: timeTable.departures, trains };
};

export const selectDepartureByTrainCode = (trainCode) => (state) => {
  // console.log("selectDepartureByTrainCode");

  // search in trains
  const departures = selectAllDepartures(state);

  if (!departures) {
    return null;
  }

  // TODO ...

  const currentIndex = Math.max(
    0,
    departures.findIndex((departure) => departure.trainCode === trainCode)
  );

  return departures[currentIndex];

  // if found:
  // if not found: return closest to the time
  // return `MY TRAIN DEPARTURE trainCode=${trainCode} currentIndex=${currentIndex}`;
};

export const selectEnhancedToTheStation = (state) => {
  // const { timeTable } = state; // MASHUP !!!!!!

  const currentTime = selectNow(state);
  const currentTrainCode = selectCurrentTrainCode(state);
  const userConfiguration = selectUserConfiguration(state);
  const stationConfiguration = selectStationConfiguration(state);
  const departures = selectAllDepartures(state);

  if (!departures || !currentTrainCode) return null;

  const departureIndex = Math.max(
    departures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    ),
    0
  );

  const departure = departures[departureIndex];

  const { onTimeMarginDelaySeconds } = userConfiguration;
  const { travelDurationSeconds, waitingDelaySeconds } = stationConfiguration;

  const travelDuration = moment.duration({
    seconds: travelDurationSeconds,
  });
  const waitingDuration = moment.duration({
    seconds: waitingDelaySeconds,
  });
  const targetTime = moment.parseZone(departure.departureTime);

  const nowTime = currentTime ? moment.parseZone(currentTime) : null;

  const { targetDuration, delayDuration } = getDelay({
    nowTime,
    targetTime,
    travelDuration,
    waitingDuration,
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
    delayStatus,
  };
};
