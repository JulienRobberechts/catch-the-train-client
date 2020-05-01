import { RootState } from "../../redux-store/types";

export const selectUserConfiguration = (state: RootState) =>
  state?.station?.userConfiguration;

export const selectStationConfigurations = (state: RootState) =>
  state?.station?.stationConfigurations;
