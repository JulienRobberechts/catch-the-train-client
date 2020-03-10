import moment from "moment";

const DEPARTURE_STATION_NAME = "Saint-Germain-en-Laye";
const DIRECTION_NAME = "Châtelet–Les Halles";
const NOW_TIME_UTC_STR = "2020-03-10T09:22:56Z";

// Next train departure time
const TARGET_TIME_UTC_STR = "2020-03-10T09:32:00Z";
const TRAVEL_DURATION_SEC = 4 * 60 + 25;
const WAITING_DELAY_SEC = 100;
const ONTIME_MARGIN_DELAY_SEC = 20;

const SelectData = () => {
  const station = DEPARTURE_STATION_NAME;
  const direction = DIRECTION_NAME;

  // UTC (Coordinated Universal Time)
  const nowTime = new moment.utc(new Date(NOW_TIME_UTC_STR));
  console.log("now", nowTime);

  const targetTime = new moment.utc(new Date(TARGET_TIME_UTC_STR)); // UTC (Coordinated Universal Time)
  console.log("targetTime", targetTime);

  const targetDuration = moment.duration(targetTime.diff(nowTime));
  console.log("targetDuration", targetDuration);
  // console.log("targetDuration minutes", targetDuration.minutes());
  // console.log("targetDuration seconds", targetDuration.seconds());
  console.log("targetDuration.valueOf", targetDuration.valueOf());
  console.log("targetDuration 2", targetDuration);

  const travelDuration = moment.duration({
    seconds: TRAVEL_DURATION_SEC
  });

  console.log("travelDuration", travelDuration);
  // console.log("travelDuration minutes", travelDuration.minutes());
  // console.log("travelDuration seconds", travelDuration.seconds());
  console.log("travelDuration.valueOf", travelDuration.valueOf());

  const travelDurationPercentage =
    (travelDuration.valueOf() / targetDuration.valueOf()) * 100;
  console.log("travelDurationPercentage", travelDurationPercentage);

  const waitingDuration = moment.duration({
    seconds: WAITING_DELAY_SEC
  });
  const waitingDurationPercentage =
    (waitingDuration.valueOf() / targetDuration.valueOf()) * 100;
  console.log("waitingDurationPercentage", waitingDurationPercentage);

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  console.log("delay", delayDuration);
  console.log("delay.valueOf()", delayDuration.valueOf());

  console.log("delayDurationMs", delayDuration);
  const delayType = getDelayType(delayDuration, targetDuration);
  console.log("delayType", delayType);

  return {
    station,
    direction,
    nowTime,
    targetDuration,
    targetTime,
    travelDuration,
    travelDurationPercentage,
    waitingDuration,
    waitingDurationPercentage,
    delayDuration,
    delayType
  };
};

const getDelayType = (delayDuration, totalDuration) => {
  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  if (delayDurationSeconds > ONTIME_MARGIN_DELAY_SEC) return "early";
  if (delayDurationSeconds < -ONTIME_MARGIN_DELAY_SEC) return "late";
  return "ontime";
};

export { SelectData };
