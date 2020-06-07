import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { colors } from "../../design/colors";
import techConfig from "../../config";
import { selectUserConfiguration } from "../../domains/station/selectors";
import { selectCurrentStationConfiguration } from "../../domains/timeTableToTheStation/selectors";
import { AppButtonLink, ButtonContainerTwo } from "../design-system/controls";
import ServerSettings from "./serverSettings";
import ClientSettings from "./clientSettings";
import UserSettings from "./userSettings";
import StationSettings from "./stationSettings";

const SettingsPage = () => {
  const stationConfiguration = useSelector(selectCurrentStationConfiguration);
  const userConfiguration = useSelector(selectUserConfiguration);
  return (
    <>
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      {stationConfiguration && (
        <>
          <SectionTitle>Trajet vers la gare</SectionTitle>
          <Section>
            <StationSettings config={stationConfiguration} />
          </Section>
        </>
      )}
      <SectionTitle>Préférences</SectionTitle>
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
      <ButtonContainerTwo>
        <AppButtonLink type="button" to="/select-journey">
          Choix du trajet
        </AppButtonLink>
        <AppButtonLink
          type="button"
          disabled={true}
          to="/rers/A/st+germain+en+laye/auber"
        >
          Prochains départs
        </AppButtonLink>
      </ButtonContainerTwo>
    </>
  );
};

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

export default SettingsPage;
