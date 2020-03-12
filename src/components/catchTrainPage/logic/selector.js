import moment from "moment";
import { ONTIME_MARGIN_DELAY_SEC, WAITING_DELAY_SEC } from "../../../config";

import {
  NOW_TIME_UTC_STR,
  TRAVEL_DURATION_SEC,
  RAW_TIME_TABLE
} from "../../../config/mock";

const SelectTimeTable = ({ nowTime }) => {
  const timeTable = transformTimeTable(RAW_TIME_TABLE, nowTime);
  console.log("timeTable", timeTable);
  return timeTable;
};

const SelectTravelData = ({ nowTime, departure }) => {
  const targetTime = new moment.utc(new Date(departure.departureTime));

  const targetDuration = moment.duration(targetTime.diff(nowTime));

  const travelDuration = moment.duration({
    seconds: TRAVEL_DURATION_SEC
  });

  const waitingDuration = moment.duration({
    seconds: WAITING_DELAY_SEC
  });

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayStatus = getDelayStatus(delayDuration, targetDuration);

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

const transformTimeTable = (timeTable, nowTime) => {
  return timeTable.route.trains.map((t, index) => {
    const departureTime = new moment.utc(new Date(t.departureTime));
    const departureTimeCode = departureTime.format("hhmm");
    const departureDuration = moment.duration(departureTime.diff(nowTime));
    const delayStatus = "early";
    return {
      index,
      departureTime,
      departureTimeCode,
      departureDuration,
      delayStatus,
      route: {
        station: timeTable.route.station,
        direction: timeTable.route.direction
      }
    };
  });
};

const getDelayStatus = (delayDuration, totalDuration) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (delayDurationSeconds > ONTIME_MARGIN_DELAY_SEC) return "early";
  if (delayDurationSeconds < -ONTIME_MARGIN_DELAY_SEC) return "late";
  return "ontime";
};

const SelectData = ({ departureTimeCode }) => {
  // UTC (Coordinated Universal Time)
  const nowTime = new moment.utc(new Date(NOW_TIME_UTC_STR));
  console.log("now", nowTime.format());

  const timeTable = SelectTimeTable({ nowTime });
  const departure = timeTable.find(
    departure => departure.departureTimeCode === departureTimeCode
  );
  console.log("departure", departure);

  const travelData = SelectTravelData({ nowTime, departure });

  return { timeTable, ...travelData };
};

export { SelectData, SelectTimeTable, SelectTravelData };
