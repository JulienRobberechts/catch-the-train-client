import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { colors } from "../../design/colors";
import techConfig from "../../config";
import { selectToTheStation } from "../../domains/toTheStation/selectors";
import { selectTimeTableContext } from "../../domains/timeTable/selectors";

import ServerSettings from "./serverSettings";
import ClientSettings from "./clientSettings";
import UserSettings from "./userSettings";
import KeyValueComponent from "./keyValue";

const SettingsPage = () => {
  const { stationConfiguration, userConfiguration } = useSelector(
    selectToTheStation
  );
  const { station } = useSelector(selectTimeTableContext);

  return (
    <>
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      <Title>Paramètres</Title>
      {station && (
        <>
          <SectionTitle>
            pour la station de <StationName>'{station?.name}'</StationName>
          </SectionTitle>
          <Section>
            <KeyValueComponent
              keyName="Temps de trajet vers la station (en secondes)"
              value={
                stationConfiguration &&
                stationConfiguration.travelDurationSeconds
              }
            />
            <KeyValueComponent
              keyName="Temps de trajet dans la station (en secondes)"
              value={
                stationConfiguration && stationConfiguration.waitingDelaySeconds
              }
            />
          </Section>
        </>
      )}
      <SectionTitle>Vos préférences</SectionTitle>
      <Section>
        <UserSettings config={userConfiguration} />
      </Section>

      <SectionTitle>Client</SectionTitle>
      <Section>
        <ClientSettings config={techConfig} />
      </Section>

      <SectionTitle>Serveur</SectionTitle>
      <Section>
        <ServerSettings serverUrl={techConfig.SERVER_ROOT_URL} />
      </Section>
    </>
  );
};

const Title = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.4rem;
  margin: 1rem 1rem;
`;

const SectionTitle = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.1rem;
  margin: 0.5rem 1rem;
`;

const Section = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 0.9rem;
  margin: 0.1rem 2rem;
`;

const StationName = styled.span`
  font-style: italic;
`;

export default SettingsPage;
