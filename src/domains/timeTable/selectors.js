import { getMatchingDeparture } from "./pure";

export const selectRequestStatus = (state) => {
  return {
    loading: !!state?.timeTable?.loading,
    error: state?.timeTable?.error,
    hasData: !!state?.timeTable?.data,
  };
};

// New version
export const selectTimeTableRequest = (state) => {
  return state?.timeTable?.request;
};

// OLD version
// export const selectTimeTableContext = (state) => {
//   return state?.timeTable?.data?.context;
// };

export const selectAllDepartures = (state) => {
  return state?.timeTable?.data?.departures ?? [];
};

export const selectDepartureByTrainCode = (trainCode) => (state) => {
  // from timeTable
  const allDepartures = state?.timeTable?.data?.departures;

  if (!allDepartures) {
    return null;
  }
  return getMatchingDeparture(allDepartures, trainCode);
};
