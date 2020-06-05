import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Helmet } from "react-helmet";
import { SettingsIcon } from "../../design/icons";
import { Link } from "react-router-dom";
import AppLogo from "./appLogo";

interface Props {
  title: string;
}
const FixedAppTitleHeightRem = 4;

const AppTitle: React.FC<Props> = ({ title }) => {
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

const Panel = styled.div`
  color: ${() => colors.dark.text.normal};
  font-weight: bold;
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Title = styled.div`
  color: ${() => colors.dark.text.original};
  font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
  margin: 0.7rem;
  text-transform: uppercase;
  text-align: center;
`;

const SettingsIconContainer = styled.div`
  margin: 0.7rem;

  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.original};
  }

  svg:hover {
    fill: ${() => colors.dark.text.highlight};
  }
`;

export { AppTitle as default, FixedAppTitleHeightRem };
