export const selectRequestStatus = (state) => {
  return {
    loading: !!state?.timeTable?.loading,
    error: state?.timeTable?.error,
    hasData: !!state?.timeTable?.data,
  };
};

export const selectTimeTableContext = (state) => {
  return state?.timeTable?.data?.context;
};

export const selectAllDepartures = (state) => {
  return state?.timeTable?.data?.departures;
};

// to move into mashup
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
