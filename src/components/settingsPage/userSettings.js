import React from "react";
import KeyValueComponent from "./keyValue";

const UserSettings = ({ config }) => {
  return (
    <>
      <KeyValueComponent
        keyName="Marge pour considérer que vous êtes à l'heure (en secondes)"
        value={config && config.onTimeMarginDelaySeconds}
      />
      <KeyValueComponent
        keyName="Fuseau horaire"
        value={config && config.timezone}
      />
    </>
  );
};

export default UserSettings;
