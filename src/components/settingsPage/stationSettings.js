import React from "react";
import KeyValueComponent from "./keyValue";

const StationSettings = ({ config }) => {
  const stationName = config.station.replace(/\+/gi, " ").toUpperCase();
  return (
    <>
      <KeyValueComponent keyName={`Gare de '${stationName}'`} />
      <KeyValueComponent
        keyName=" > Temps de trajet vers la gare "
        value={config && config.travelDurationSeconds}
        unit="secondes"
      />
      <KeyValueComponent
        keyName=" > Temps dans la gare pour atteindre le quai"
        value={config && config.accessDurationSeconds}
        unit="secondes"
      />
    </>
  );
};

export default StationSettings;
