import { getMatchingDeparture } from "./pure";
import { RootState } from "../../redux-store/types";

export const selectRequestStatus = (state: RootState) => {
  return {
    loading: !!state?.timeTable?.loading,
    error: state?.timeTable?.error,
    hasData: !!state?.timeTable?.data,
  };
};

export const selectAllDepartures = (state: RootState) => {
  return state?.timeTable?.data?.departures ?? [];
};

export const selectDepartureByTrainCode = (trainCode: string) => (
  state: RootState
) => {
  const allDepartures = state?.timeTable?.data?.departures;

  if (!allDepartures) {
    return null;
  }
  return getMatchingDeparture(allDepartures, trainCode);
};
