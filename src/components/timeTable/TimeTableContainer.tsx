import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import TimeTable from "./timetable";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";

function TimeTableContainer() {
  const { push } = useHistory();

  const { enhancedDepartures } = useSelector(selectEnhancedTimeTable);
  const currentTrainCode = useSelector(selectCurrentTrainCode);

  if (!enhancedDepartures) {
    return <div>...</div>;
  }

  return (
    <TimeTable
      enhancedDepartures={enhancedDepartures}
      currentTrainCode={currentTrainCode}
      handleDepartureNav={(targetTrainCode) => () => {
        push(`/next-train/${targetTrainCode}`);
      }}
    />
  );
}

export default TimeTableContainer;
