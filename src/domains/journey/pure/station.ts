import { MapPosition } from "../../map/geoTypes";

interface Station {
  slug: string;
  name: string;
  altName?: string;
  pos?: MapPosition;
}

const getStation = (
  stationSlug: string | undefined,
  allStations: Station[]
) => {
  if (!allStations) return undefined;
  const station = allStations.find((s) => s.slug === stationSlug);
  return station;
};

export { getStation };
