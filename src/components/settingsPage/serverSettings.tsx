import React, { useEffect, useState } from "react";
import { getServerParameters, PingResult } from "../../adapters/ping";
import KeyValueComponent from "./keyValue";

interface Props {
  serverUrl: string;
}

const ServerSettings: React.FC<Props> = ({ serverUrl }) => {
  const [serverData, setServerData] = useState<PingResult>({ loading: true });

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
        keyName="Ip sortante du serveur"
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
