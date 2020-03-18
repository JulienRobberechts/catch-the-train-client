export const selectConfigIsValid = state => {
  return true;
  // Not sure it should be here!!
  // return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = state => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};

export const selectTrainDeparture = ({
  stationCode,
  direction,
  trainCode
}) => state => {
  // search in trains
  const trains = state?.timeTable?.route?.trains;

  if (!trains) {
    return null;
  }

  // TODO ...

  const currentIndex = Math.max(
    0,
    trains.findIndex(departure => departure.trainCode === trainCode)
  );
  console.log("trainDeparture currentIndex ========", currentIndex);
  return trains[currentIndex];

  // if found:
  // if not found: return closest to the time
  // return `MY TRAIN DEPARTURE trainCode=${trainCode} currentIndex=${currentIndex}`;
};
