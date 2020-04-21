export const selectUserConfiguration = (state) =>
  state?.toTheStation?.userConfiguration;

export const selectCurrentTrainCode = (state) =>
  state?.toTheStation?.currentTrainCode;

export const selectNow = (state) => state?.toTheStation?.currentTime;
