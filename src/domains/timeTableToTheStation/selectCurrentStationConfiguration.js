export const selectCurrentStationConfiguration = (state) => {
  const currentStation = state?.timeTable?.request?.departure;
  const stationConfigurations = state?.toTheStation?.stationConfigurations;
  if (currentStation && stationConfigurations)
    return stationConfigurations[currentStation];
  return undefined;
};
