import { getMatchingDeparture } from "./pure";

export const selectRequestStatus = (state) => {
  return {
    loading: !!state?.timeTable?.loading,
    error: state?.timeTable?.error,
    hasData: !!state?.timeTable?.data,
  };
};

export const selectAllDepartures = (state) => {
  return state?.timeTable?.data?.departures ?? [];
};

export const selectDepartureByTrainCode = (trainCode) => (state) => {
  const allDepartures = state?.timeTable?.data?.departures;

  if (!allDepartures) {
    return null;
  }
  return getMatchingDeparture(allDepartures, trainCode);
};
