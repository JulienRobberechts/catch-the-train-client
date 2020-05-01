import { selectCurrentJourney } from "../journey/selectors";
import { selectStationConfigurations } from "../station/selectors";
import { RootState } from "../../redux-store/types";

export const selectCurrentStationConfiguration = (state: RootState) => {
  const currentStation = selectCurrentJourney(state)?.departure;
  const stationConfigurations = selectStationConfigurations(state);
  if (currentStation && stationConfigurations)
    return stationConfigurations[currentStation];
  return undefined;
};
