import { selectCurrentJourney } from "../journey/selectors";
import { selectStationConfigurations } from "../station/selectors";

export const selectCurrentStationConfiguration = (state) => {
  const currentStation = selectCurrentJourney(state)?.departure;
  const stationConfigurations = selectStationConfigurations(state);
  if (currentStation && stationConfigurations)
    return stationConfigurations[currentStation];
  return undefined;
};
