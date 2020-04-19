import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";

import { colors } from "../../design/colors";
import techConfig from "../../config";
import {
  selectUserConfiguration,
  selectStationConfiguration,
} from "../../domains/toTheStation/selectors";
import { AppButtonLink, ButtonContainerTwo } from "../design-system/controls";
import ServerSettings from "./serverSettings";
import ClientSettings from "./clientSettings";
import UserSettings from "./userSettings";
import StationSettings from "./stationSettings";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  setUserConfiguration,
  setStationConfiguration,
} from "../../domains/toTheStation/slice";

const SettingsPage = () => {
  const stationConfiguration = useSelector(selectStationConfiguration);
  const userConfiguration = useSelector(selectUserConfiguration);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUserConfiguration({
        onTimeMarginDelaySeconds: 50,
        timezone: "+01:00",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setStationConfiguration({
        station: "chatelet+les+halles",
        travelDurationSeconds: 10 * 60 + 25,
        waitingDelaySeconds: 100,
      })
    );
  }, [dispatch]);

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
          to="/rers/A/st+germain+en+laye?missions=QIKI,NELY"
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
