import React from "react";
import getLanguage from "../../domains/config/getLanguage";
import KeyValueComponent from "./keyValue";

import jstz from "jstz";

const ClientSettings = ({ config }) => {
  const timezone = jstz.determine();
  const timeZoneName = `${timezone.name()}: ${timezone.stdTimezoneOffset()} mins usually and ${timezone.timezoneOffset()} mins now`;
  // => Europe/Paris: -60 mins usually and -120 mins now
  return (
    <>
      <KeyValueComponent
        keyName="Nom de l'application"
        value={config.APPLICATION_NAME}
      />
      <KeyValueComponent
        keyName="Version de l'application"
        value={config.APPLICATION_VERSION}
      />
      <KeyValueComponent keyName="Environement" value={config.ENVIRONMENT} />
      <KeyValueComponent keyName="Port" value={config.PORT} />
      <KeyValueComponent keyName="Url du client" value={config.CLIENT_URL} />
      <KeyValueComponent
        keyName="Langue"
        value={getLanguage(config.CLIENT_URL)}
      />
      <KeyValueComponent keyName="Fuseau horaire" value={timeZoneName} />
    </>
  );
};

export default ClientSettings;
