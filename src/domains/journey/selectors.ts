import { RootState } from "../../redux-store/types";

export const selectCurrentJourney = (state: RootState) => {
  return state?.journey;
};
