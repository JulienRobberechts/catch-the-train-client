// // change every 1s ===> Generated
// export const NOW_TIME_UTC_STR = "2020-03-10T09:19:56Z";

// // change on location - config data
// export const TRAVEL_DURATION_SEC = 10 * 60 + 25;

// // global parameter - config data
// export const ONTIME_MARGIN_DELAY_SEC = 20;

// // change every station - config data
// export const WAITING_DELAY_SEC = 100;

export const mockConfig = {
  currentTime: "2020-03-10T09:19:56Z",
  station: {
    code: "SGL",
    name: "Saint-Germain-en-Laye",
    travelDurationSeconds: 10 * 60 + 25,
    onTimeMarginDelaySeconds: 20
  },
  train: {
    departureTime: "2020-03-10T09:32:00Z",
    trainCode: "0932",
    platform: "4"
  },
  configuration: {
    waitingDelaySeconds: 100,
    timezone: "+01:00"
  }
};
