export const selectUserConfiguration = (state) =>
  state?.toTheStation?.userConfiguration;

export const selectStationConfiguration = (state) =>
  state?.toTheStation?.stationConfiguration;

export const selectCurrentTrainCode = (state) =>
  state?.toTheStation?.currentTrainCode;

export const selectNow = (state) => state?.toTheStation?.currentTime;
