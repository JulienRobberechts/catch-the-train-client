import React from "react";
import getLanguage from "../../domains/config/getLanguage";
import KeyValueComponent from "./keyValue";

const ClientSettings = ({ config }) => {
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
    </>
  );
};

export default ClientSettings;
