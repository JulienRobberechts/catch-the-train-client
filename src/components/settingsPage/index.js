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
      <LinkSection>
        <NavButton type="button" size="medium" inverted color="orange">
          Choix du trajet
        </NavButton>
        <NavButton type="button" size="medium" inverted color="orange">
          Prochains départs
        </NavButton>
      </LinkSection>
    </>
  );
};
const NavButton = styled(Button)`
  flex-grow: 1;

  &.ui.inverted.orange.button {
    margin: 0.5rem 0;
    // background-color: green;
  }

  &.ui.inverted.orange.button + &.ui.inverted.orange.button {
    margin-left: 1.5rem;
    // background-color: yellow;
  }

  &.ui.inverted.orange.button.active,
  &.ui.inverted.orange.button:active,
  &.ui.inverted.orange.button:focus,
  &.ui.inverted.orange.button:hover,
  &.ui.inverted.orange.buttons .button.active,
  &.ui.inverted.orange.buttons .button:active,
  &.ui.inverted.orange.buttons .button:focus,
  &.ui.inverted.orange.buttons .button:hover {
    box-shadow: none !important;
    color: #252149;
    background-color: #60a38e;
  }
  &.ui.inverted.orange.button {
    background-color: transparent;
    box-shadow: 0 0 0 2px #60a38e inset !important;
    color: #60a38e;
  }
`;

const LinkSection = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  justify-items: space-between;
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

export default SettingsPage;
