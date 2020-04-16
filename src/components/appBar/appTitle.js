import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Helmet } from "react-helmet";
import { SettingsIcon } from "../../design/icons";
import { Link } from "react-router-dom";
import AppLogo from "./appLogo";

const AppTitle = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>Attraper le train</title>
      </Helmet>
      <Panel>
        <AppLogo />
        <Title>{title}</Title>
        <SettingsIconContainer className="ui icon" as={Link} to={`/settings`}>
          <SettingsIcon />
        </SettingsIconContainer>
      </Panel>
    </>
  );
};

const Title = styled.div`
  color: ${() => colors.dark.text.original};
  font-size: 1.2rem;
  margin: 1rem 1rem;
  text-transform: uppercase;
`;

const Panel = styled.div`
  color: ${() => colors.dark.text.normal};
  font-weight: bold;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
`;

const SettingsIconContainer = styled.div`
  margin-right: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.1rem;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.original};
  }

  svg:hover {
    fill: ${() => colors.dark.text.highlight};
  }
`;

export default AppTitle;
