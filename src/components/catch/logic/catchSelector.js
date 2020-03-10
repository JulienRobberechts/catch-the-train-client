import moment from "moment";

const DEPARTURE_STATION_NAME = "Saint-Germain-en-Laye";
const DIRECTION_NAME = "Châtelet–Les Halles";

const NOW_UTC_STR = "2020-03-10T09:22:56Z";
const TRAVEL_DURATION_SEC = 7 * 60 + 25;
const NEXT_DEPARTURE_UTC_STR = "2020-03-10T09:32:00Z";

const OPTIMUM_DELAY_SEC = 100;
const ONTIME_MARGIN_DELAY_SEC = 20;

const SelectData = () => {
  const station = DEPARTURE_STATION_NAME;
  const direction = DIRECTION_NAME;

  // UTC (Coordinated Universal Time)
  const now = new moment.utc(new Date(NOW_UTC_STR));
  console.log("now", now);

  const trainDeparture = new moment.utc(new Date(NEXT_DEPARTURE_UTC_STR)); // UTC (Coordinated Universal Time)
  console.log("trainDeparture", trainDeparture);

  const targetDuration = moment.duration(trainDeparture.diff(now));
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

  const inAdvanceDuration = moment.duration({
    seconds: OPTIMUM_DELAY_SEC
  });
  const inAdvanceDurationPercentage =
    (inAdvanceDuration.valueOf() / targetDuration.valueOf()) * 100;
  console.log("inAdvanceDurationPercentage", inAdvanceDurationPercentage);

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  d("delayDuration 1", delayDuration);
  delayDuration.subtract(travelDuration);
  d("delayDuration 2", delayDuration);
  delayDuration.subtract(inAdvanceDuration);
  d("delayDuration 3", delayDuration);

  console.log("delay", delayDuration);
  console.log("delay.valueOf()", delayDuration.valueOf());

  console.log("delayDurationMs", delayDuration);
  const delayType = getDelayType(delayDuration, targetDuration);
  console.log("delayType", delayType);

  return {
    station,
    direction,
    now,
    targetDuration,
    trainDeparture,
    travelDuration,
    travelDurationPercentage,
    delayDuration,
    delayType,
    inAdvanceDuration,
    inAdvanceDurationPercentage
  };
};

const d = (msg, duration) => {
  console.log("duration " + msg, duration.valueOf() / 1000);
};

const getDelayType = (delayDuration, totalDuration) => {
  d("delayDuration 4", delayDuration);
  d("totalDuration 0", totalDuration);

  const delayDurationSeconds = delayDuration.valueOf() / 1000;
  console.log("delayDurationSeconds", delayDurationSeconds);
  console.log("ONTIME_MARGIN_DELAY_SEC", ONTIME_MARGIN_DELAY_SEC);

  if (delayDurationSeconds > ONTIME_MARGIN_DELAY_SEC) return "early";
  if (delayDurationSeconds < -ONTIME_MARGIN_DELAY_SEC) return "late";
  console.log("ontime", "YES");
  return "ontime";
};

export { SelectData };
