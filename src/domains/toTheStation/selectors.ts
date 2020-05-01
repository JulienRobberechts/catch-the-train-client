import { RootState } from "../../redux-store/types";

export const selectCurrentTrainCode = (state: RootState) =>
  state?.toTheStation?.currentTrainCode;

export const selectNow = (state: RootState) =>
  state?.toTheStation?.currentTime!;
