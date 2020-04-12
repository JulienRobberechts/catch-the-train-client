const getStation = (stationSlug, allStations) => {
  if (!allStations) return undefined;
  const station = allStations.find((s) => s.slug === stationSlug);
  return station;
};

export { getStation };
