// ---------------------------------------------------
//                  Super-selectors
//   Mashup of timeTable and toTheStation in order
//        to provide a ready-to-use selectors.
// ---------------------------------------------------

export const selectCurrentStationConfiguration = (state) => {
  const currentStation = state?.timeTable?.request?.departure;
  // console.log("currentStation", currentStation);
  const stationConfigurations = state?.toTheStation?.stationConfigurations;
  // console.log("stationConfigurations", stationConfigurations);
  if (currentStation && stationConfigurations)
    return stationConfigurations[currentStation];
  return undefined;
};
