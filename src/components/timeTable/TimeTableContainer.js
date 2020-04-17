import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentTrainCode } from "../../domains/toTheStation/selectors";
import { selectTimeTableRequest } from "../../domains/timeTable/selectors";
import { selectEnhancedTimeTable } from "../../domains/timeTableToTheStation/selectors";
import TimeTable from "./timetable";

const NUMBER_OF_DEPARTURE_VISIBLE = 3;

function TimeTableContainer() {
  const { push } = useHistory();

  const { enhancedDepartures } = useSelector(selectEnhancedTimeTable);
  const currentTrainCode = useSelector(selectCurrentTrainCode);

  const request = useSelector(selectTimeTableRequest);

  if (!enhancedDepartures || !request) {
    return <div>...</div>;
  }

  const { network, line, station, missions } = request;

  const missionsString = !!missions ? "?missions=" + missions : "";

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
  const previousLink = `/${network}/${line}/${station}/${previousDeparture?.trainCode}${missionsString}`;

  const nextVisible =
    minIndex < enhancedDepartures.length - NUMBER_OF_DEPARTURE_VISIBLE;
  const nextDeparture = enhancedDepartures[currentIndex + 1];
  const nextLink = `/${network}/${line}/${station}/${nextDeparture?.trainCode}${missionsString}`;

  return (
    <TimeTable
      enhancedDepartures={enhancedDepartures}
      minIndex={minIndex}
      currentTrainCode={currentTrainCode}
      handleDepartureNav={(targetTrainCode) => () => {
        push(
          `/${network}/${line}/${station}/${targetTrainCode}${missionsString}`
        );
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
