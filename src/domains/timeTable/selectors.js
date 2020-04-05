export const selectConfigIsValid = (state) => {
  return true;
  // Not sure it should be here!!
  // return !!state?.timeTable.route?.station?.code;
};

export const selectRoute = (state) => {
  return state?.timeTable?.data;
};

export const selectTimeTableContext = (state) => {
  return state?.timeTable?.data?.context;
};

export const selectTrainDeparture = ({
  network,
  line,
  station,
  train: trainCode,
}) => (state) => {
  console.log("selectTrainDeparture");

  // todo:
  // check network, line, station are still ok.

  // search in trains
  const departures = state?.timeTable?.data?.departures;

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
