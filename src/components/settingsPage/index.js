import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { colors } from "../../design/colors";
import techConfig from "../../config";
import { selectToTheStation } from "../../domains/toTheStation/selectors";
import getLanguage from "../../domains/config/getLanguage";

const SettingsPage = () => {
  const {
    noData,
    station,
    stationConfiguration,
    userConfiguration
  } = useSelector(selectToTheStation);

  return (
    <>
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      <Title>Paramètres</Title>
      {!noData && (
        <>
          <SectionTitle>
            pour la station de <StationName>'{station?.name}'</StationName>
          </SectionTitle>
          <Section>
            <KeyValue>
              <Key>Temps de trajet vers la station (en secondes)</Key>
              <EqualSign>:</EqualSign>
              <Value>
                {stationConfiguration &&
                  stationConfiguration.travelDurationSeconds}
              </Value>
            </KeyValue>
            <KeyValue>
              <Key>Temps de trajet dans la station (en secondes)</Key>
              <EqualSign>:</EqualSign>
              <Value>
                {stationConfiguration &&
                  stationConfiguration.waitingDelaySeconds}
              </Value>
            </KeyValue>
          </Section>
        </>
      )}
      <SectionTitle>Vos préférences</SectionTitle>
      <Section>
        <KeyValue>
          <Key>Marge pour considérer que vous êtes à l'heure (en secondes)</Key>
          <EqualSign>:</EqualSign>
          <Value>
            {userConfiguration && userConfiguration.onTimeMarginDelaySeconds}
          </Value>
        </KeyValue>
        <KeyValue>
          <Key>Fuseau horaire</Key>
          <EqualSign>:</EqualSign>
          <Value>{userConfiguration && userConfiguration.timezone}</Value>
        </KeyValue>
      </Section>
      <SectionTitle>Technique</SectionTitle>
      <Section>
        <KeyValue>
          <Key>Nom de l'application</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.APPLICATION_NAME}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Version de l'application</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.APPLICATION_VERSION}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Environement</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.ENVIRONMENT}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Port</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.PORT}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Url du serveur</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.SERVER_ROOT_URL}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Url du client</Key>
          <EqualSign>:</EqualSign>
          <Value>{techConfig.CLIENT_URL}</Value>
        </KeyValue>
        <KeyValue>
          <Key>Langue</Key>
          <EqualSign>:</EqualSign>
          <Value>{getLanguage(techConfig.CLIENT_URL)}</Value>
        </KeyValue>
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

const KeyValue = styled.div``;

const Key = styled.span`
  color: ${() => colors.dark.text.disabled};
`;
const EqualSign = styled.span`
  color: ${() => colors.dark.text.disabled};
  margin-right: 0.6rem;
`;
const Value = styled.span``;
const StationName = styled.span`
  font-style: italic;
`;
export default SettingsPage;
