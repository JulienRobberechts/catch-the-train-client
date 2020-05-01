import React from "react";
import KeyValueComponent from "./keyValue";
import { PayloadStationConfiguration } from "../../domains/station/types";

interface Props {
  config: PayloadStationConfiguration;
}

const StationSettings: React.FC<Props> = ({ config }) => {
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
