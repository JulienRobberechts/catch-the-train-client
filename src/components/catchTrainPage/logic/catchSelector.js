import moment from "moment";

// global parameter - config data
const ONTIME_MARGIN_DELAY_SEC = 20;

// change every station - config data
const WAITING_DELAY_SEC = 100;

// change every route - config data
const DEPARTURE_STATION_NAME = "Saint-Germain-en-Laye";
const DIRECTION_NAME = "Châtelet–Les Halles";

// change on location - config data
const TRAVEL_DURATION_SEC = 10 * 60 + 25;

// change every train selection - Server Data - 3 mins
const TARGET_TIME_UTC_STR = "2020-03-10T09:32:00Z";

// change every 1s
const NOW_TIME_UTC_STR = "2020-03-10T09:19:56Z";

// change every 3 mins - Server Data
const RAW_SCHEDULE = {
  trains: [
    {
      departureTime: "2020-03-10T09:24:00Z",
      platform: "2"
    },
    {
      departureTime: "2020-03-10T09:32:00Z",
      platform: "4"
    },
    {
      departureTime: "2020-03-10T09:43:00Z",
      platform: "2"
    },
    {
      departureTime: "2020-03-10T09:55:00Z",
      platform: "4"
    },
    {
      departureTime: "2020-03-10T10:05:00Z",
      platform: "4"
    },
    {
      departureTime: "2020-03-10T10:21:00Z",
      platform: "2"
    }
  ]
};

const SelectTimeTable = ({ nowTime }) => {
  const timeTable = extendSchedule(RAW_SCHEDULE, nowTime);
  console.log("timeTable", timeTable);
  return timeTable;
};

const SelectTravelData = ({ nowTime, departure }) => {
  const station = DEPARTURE_STATION_NAME;
  const direction = DIRECTION_NAME;

  const targetTime = new moment.utc(new Date(departure.departureTime)); // UTC (Coordinated Universal Time)
  // console.log("targetTime", targetTime);

  const targetDuration = moment.duration(targetTime.diff(nowTime));
  // console.log("targetDuration", targetDuration);
  // console.log("targetDuration minutes", targetDuration.minutes());
  // console.log("targetDuration seconds", targetDuration.seconds());
  // console.log("targetDuration.valueOf", targetDuration.valueOf());
  // console.log("targetDuration 2", targetDuration);

  const travelDuration = moment.duration({
    seconds: TRAVEL_DURATION_SEC
  });

  // console.log("travelDuration", travelDuration);
  // console.log("travelDuration minutes", travelDuration.minutes());
  // console.log("travelDuration seconds", travelDuration.seconds());
  // console.log("travelDuration.valueOf", travelDuration.valueOf());

  const travelDurationPercentage =
    (travelDuration.valueOf() / targetDuration.valueOf()) * 100;
  // console.log("travelDurationPercentage", travelDurationPercentage);

  const waitingDuration = moment.duration({
    seconds: WAITING_DELAY_SEC
  });
  const waitingDurationPercentage =
    (waitingDuration.valueOf() / targetDuration.valueOf()) * 100;
  // console.log("waitingDurationPercentage", waitingDurationPercentage);

  // positive will be early and negative late
  const delayDuration = targetDuration.clone();
  delayDuration.subtract(travelDuration);
  delayDuration.subtract(waitingDuration);

  const delayDurationPercentage =
    (delayDuration.valueOf() / targetDuration.valueOf()) * 100;
  // console.log("delayDurationPercentage", delayDurationPercentage);

  // console.log("delay", delayDuration);
  // console.log("delay.valueOf()", delayDuration.valueOf());

  // console.log("delayDurationMs", delayDuration);
  const delayStatus = getDelayStatus(delayDuration, targetDuration);
  // console.log("delayStatus", delayStatus);

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
    delayDurationPercentage,
    delayStatus
  };
};

const extendSchedule = (schedule, nowTime) => {
  return schedule.trains.map((t, index) => {
    const departureTime = new moment.utc(new Date(t.departureTime));
    const departureTimeCode = departureTime.format("hhmm");
    const departureDuration = moment.duration(departureTime.diff(nowTime));
    const delayStatus = "early";
    return {
      index,
      departureTime,
      departureTimeCode,
      departureDuration,
      delayStatus
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

  return { schedule: timeTable, ...travelData };
};

export { SelectData, SelectTimeTable, SelectTravelData };
