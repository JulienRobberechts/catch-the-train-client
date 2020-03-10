import moment from "moment";

const DEPARTURE_STATION_NAME = "Saint-Germain-en-Laye";
const DIRECTION_NAME = "Châtelet–Les Halles";

const NOW_UTC_STR = "2020-03-10T09:22:39Z";
const TRAVEL_DURATION_SEC = 325; // 5 * 60 + 25;
const NEXT_DEPARTURE_UTC_STR = "2020-03-10T09:32:00Z";

const SelectData = () => {
  const station = DEPARTURE_STATION_NAME;
  const direction = DIRECTION_NAME;

  // UTC (Coordinated Universal Time)
  const now = new moment.utc(new Date(NOW_UTC_STR)).local();
  console.log("now", now);

  const trainDeparture = new moment.utc(
    new Date(NEXT_DEPARTURE_UTC_STR)
  ).local(); // UTC (Coordinated Universal Time)
  console.log("trainDeparture", trainDeparture);

  const durationToTrain = moment.duration(trainDeparture.diff(now));
  console.log("durationToTrain", durationToTrain);
  // console.log("durationToTrain minutes", durationToTrain.minutes());
  // console.log("durationToTrain seconds", durationToTrain.seconds());
  console.log("durationToTrain.valueOf", durationToTrain.valueOf());
  console.log("durationToTrain 2", durationToTrain);

  const travelDuration = moment.duration({
    seconds: TRAVEL_DURATION_SEC
  });

  console.log("travelDuration", travelDuration);
  // console.log("travelDuration minutes", travelDuration.minutes());
  // console.log("travelDuration seconds", travelDuration.seconds());
  console.log("travelDuration.valueOf", travelDuration.valueOf());

  const percentageTravelToRemainingTime =
    travelDuration.valueOf() / durationToTrain.valueOf();
  console.log(
    "percentageTravelToRemainingTime",
    percentageTravelToRemainingTime
  );

  // positive will be early and negative late
  const delay = durationToTrain.subtract(travelDuration);
  console.log("delay", delay);

  return {
    station,
    direction,
    now,
    durationToTrain,
    trainDeparture,
    travelDuration,
    percentageTravelToRemainingTime,
    delay
  };
};

export { SelectData };
