import { selectCurrentJourney } from "../journey/selectors";
import { selectStationConfigurations } from "../station/selectors";
import { RootState } from "../../redux-store/types";
import { StationConfigurationWithStation } from "../station/types";

export const selectCurrentStationConfiguration = (
  state: RootState
): StationConfigurationWithStation | undefined => {
  const currentStation = selectCurrentJourney(state)?.departure;
  const stationConfigurations = selectStationConfigurations(state);
  if (currentStation && stationConfigurations)
    return {
      station: currentStation,
      ...stationConfigurations[currentStation],
    };
  return undefined;
};
