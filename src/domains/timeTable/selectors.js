export const selectConfigIsValid = (state) => {
  return true;
  // Not sure it should be here!!
  // return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = (state) => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = (state) => {
  return state?.timeTable?.data;
};

export const selectTrainDeparture = ({
  type,
  line,
  station,
  train: trainCode,
}) => (state) => {
  console.log("selectTrainDeparture");

  // search in trains
  const trains = state?.timeTable?.data?.routes;

  if (!trains) {
    return null;
  }

  // TODO ...

  const currentIndex = Math.max(
    0,
    trains.findIndex((departure) => departure.trainCode === trainCode)
  );

  return trains[currentIndex];

  // if found:
  // if not found: return closest to the time
  // return `MY TRAIN DEPARTURE trainCode=${trainCode} currentIndex=${currentIndex}`;
};
