import { MissionsSchedule } from "./../dataAccess";

interface FormattedMissionsSchedule {
  mission: string;
  stations: string[];
}

function formatMissionsSchedules(
  missionsSchedules: MissionsSchedule[]
): FormattedMissionsSchedule[] {
  const formattedSchedules = missionsSchedules.map(({ mission, result }) => ({
    mission,
    stations: result.stations.map((station) => station.slug),
  }));
  return formattedSchedules;
}

function calculateMissionsForJourney(
  missionsSchedules: FormattedMissionsSchedule[],
  departureStation: string,
  arrivalStation: string
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

interface ExtendedSchedule {
  stations: string[];
  [x: string]: any;
}

const addStationIndexToSchedule = (station: string, indexPropName: string) => ({
  stations,
  ...otherProps
}: {
  stations: string[];
}): ExtendedSchedule => ({
  [indexPropName]: stations.findIndex((s) => s === station),
  stations,
  ...otherProps,
});

export {
  formatMissionsSchedules,
  calculateMissionsForJourney,
  addStationIndexToSchedule,
};
