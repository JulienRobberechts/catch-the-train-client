interface Station {
  name: string;
  slug: string;
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
