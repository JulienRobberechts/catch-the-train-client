import React from "react";
import KeyValueComponent from "./keyValue";

const StationSettings = ({ config }) => {
  const stationName = config.station.replace(/\+/gi, " ").toUpperCase();
  return (
    <>
      <KeyValueComponent keyName={`Gare de '${stationName}'`} />
      <KeyValueComponent
        keyName=" > Temps de trajet vers la gare (en secondes)"
        value={config && config.travelDurationSeconds}
      />
      <KeyValueComponent
        keyName=" > Temps de trajet dans la gare (en secondes)"
        value={config && config.waitingDelaySeconds}
      />
    </>
  );
};

export default StationSettings;
