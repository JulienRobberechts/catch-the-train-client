import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import TimeTable from "./timetable";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";

const NUMBER_OF_DEPARTURE_VISIBLE = 3;

function TimeTableContainer() {
  const { push } = useHistory();

  const { enhancedDepartures } = useSelector(selectEnhancedTimeTable);
  const currentTrainCode = useSelector(selectCurrentTrainCode);

  if (!enhancedDepartures) {
    return <div>...</div>;
  }

  const currentIndex = Math.max(
    0,
    enhancedDepartures.findIndex(
      (departure) => departure.trainCode === currentTrainCode
    )
  );

  const minIndex = Math.max(
    0,
    Math.min(
      currentIndex - 1,
      enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE
    )
  );

  const previousVisible = minIndex > 0;
  const previousDeparture = enhancedDepartures[currentIndex - 1];
  const previousLink = `/next-train/${previousDeparture?.trainCode}`;

  const nextVisible =
    minIndex < enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE;
  const nextDeparture = enhancedDepartures[currentIndex + 1];
  const nextLink = `/next-train/${nextDeparture?.trainCode}`;

  return (
    <TimeTable
      enhancedDepartures={enhancedDepartures}
      minIndex={minIndex}
      currentTrainCode={currentTrainCode}
      handleDepartureNav={(targetTrainCode) => () => {
        push(`/next-train/${targetTrainCode}`);
      }}
      previousVisible={previousVisible}
      handlePreviousDepartureNav={() => push(previousLink)}
      nextVisible={nextVisible}
      handleNextDepartureNav={() => push(nextLink)}
      numberOfDepartureVisible={NUMBER_OF_DEPARTURE_VISIBLE}
    />
  );
}

export default TimeTableContainer;
