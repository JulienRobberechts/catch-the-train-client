import { ReduxStateJourney } from "../domains/journey/types";
import { ReduxStateStation } from "../domains/station/types";
import { ReduxStateTimeTable } from "../domains/timeTable/types";
import { ReduxStateToTheStation } from "../domains/toTheStation/types";

export interface RootState {
  journey?: ReduxStateJourney;
  station?: ReduxStateStation;
  timeTable?: ReduxStateTimeTable;
  toTheStation?: ReduxStateToTheStation;
}
