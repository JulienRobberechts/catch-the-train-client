import React, { useEffect, useState } from "react";
import { getServerParameters } from "../../adapters/ping";
import KeyValueComponent from "./keyValue";

const ServerSettings = ({ serverUrl }) => {
  const [serverData, setServerData] = useState({ loading: true });

  useEffect(() => {
    (async () => setServerData(await getServerParameters(serverUrl)))();
  }, [setServerData, serverUrl]);

  return (
    <>
      <KeyValueComponent keyName="Url du serveur" value={serverUrl} />
      <KeyValueComponent
        keyName="Statut"
        value={
          serverData.error
            ? serverData.error.toString()
            : serverData.loading
            ? "chargement en cours..."
            : serverData.status
        }
      />
      <KeyValueComponent
        keyName="Ip publique du serveur"
        value={serverData?.serverPublicIp ?? "-"}
      />
      <KeyValueComponent
        keyName="Version du serveur"
        value={serverData?.version ?? "-"}
      />
    </>
  );
};

export default ServerSettings;
