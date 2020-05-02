import { selectCurrentJourney } from "../journey/selectors";
import { selectStationConfigurations } from "../station/selectors";
import { RootState } from "../../redux-store/types";
import { PayloadStationConfiguration } from "../station/types";

export const selectCurrentStationConfiguration = (
  state: RootState
): PayloadStationConfiguration | undefined => {
  const currentStation = selectCurrentJourney(state)?.departure;
  const stationConfigurations = selectStationConfigurations(state);
  if (currentStation && stationConfigurations)
    return {
      station: currentStation,
      ...stationConfigurations[currentStation],
    };
  return undefined;
};
