import { FullJourney } from "../domains/journey/types";
import { ReduxStateStation } from "../domains/station/types";
import { ReduxStateTimeTable } from "../domains/timeTable/types";
import { ReduxStateToTheStation } from "../domains/toTheStation/types";

export interface RootState {
  journey?: FullJourney;
  station?: ReduxStateStation;
  timeTable?: ReduxStateTimeTable;
  toTheStation?: ReduxStateToTheStation;
}
