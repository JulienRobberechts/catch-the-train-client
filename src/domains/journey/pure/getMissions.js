import stationsNANI from "../../../data/ratp/rers/A/stations-NANI.json";
import stationsNOTE from "../../../data/ratp/rers/A/stations-NOTE.json";
import stationsQIKI from "../../../data/ratp/rers/A/stations-QIKI.json";

export default function getMissions(departureStation, arrivalStation) {
  const missionsSchedules = getMissionsSchedules();
  const missions = calculateMissionsForJourney(
    missionsSchedules,
    departureStation,
    arrivalStation
  );
  return missions;
}

export function getMissionsSchedules() {
  const missionsSchedules = [
    { mission: "NANI", ...stationsNANI },
    { mission: "NOTE", ...stationsNOTE },
    { mission: "QIKI", ...stationsQIKI },
  ];
  const formattedSchedule = missionsSchedules.map(({ mission, result }) => ({
    mission,
    stations: result.stations.map((station) => station.slug),
  }));
  return formattedSchedule;
}

export function calculateMissionsForJourney(
  missionsSchedules,
  departureStation,
  arrivalStation
) {
  const missions = missionsSchedules
    .map(addStationIndexToSchedule(departureStation, "departureStationIndex"))
    .filter((schedule) => schedule.departureStationIndex >= 0)
    .map(addStationIndexToSchedule(arrivalStation, "arrivalStationIndex"))
    .filter((schedule) => schedule.arrivalStationIndex >= 0)
    .filter(
      (schedule) =>
        schedule.arrivalStationIndex >= schedule.departureStationIndex
    )
    .map((schedule) => schedule.mission);

  return missions;
}

const addStationIndexToSchedule = (station, indexPropName) => ({
  stations,
  ...otherProps
}) => ({
  [indexPropName]: stations.findIndex((s) => s === station),
  stations,
  ...otherProps,
});

export { addStationIndexToSchedule };
