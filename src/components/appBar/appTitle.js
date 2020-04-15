import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Helmet } from "react-helmet";
import { LogoIcon, SettingsIcon } from "../../design/icons";
import { Link } from "react-router-dom";

const AppTitle = () => {
  return (
    <>
      <Helmet>
        <title>Attraper le train</title>
      </Helmet>
      <Panel>
        <Logo as={Link} to={`/start`}>
          <LogoIconContainer className="ui icon">
            <LogoIcon />
          </LogoIconContainer>
          <LogoText>
            <div>Attraper</div>
            <LogoTextLeTrain>
              <span>l</span>e train
            </LogoTextLeTrain>
          </LogoText>
        </Logo>
        <SettingsIconContainer
          className="ui circular icon"
          as={Link}
          to={`/settings`}
        >
          <SettingsIcon />
        </SettingsIconContainer>
      </Panel>
    </>
  );
};

const Panel = styled.div`
  color: ${() => colors.dark.text.normal};
  font-weight: bold;
  padding: 0.3rem;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  margin: 0.2rem;
  display: flex;
`;

const LogoText = styled.div`
  margin: 0rem;
  padding-top: 0rem;
  color: ${() => colors.dark.text.original};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const LogoTextLeTrain = styled.div`
  font-style: oblique;
  font-family: "serif";
  font-size: 1.4rem;
  color: #ddd;
`;

const LogoIconContainer = styled.div`
  margin-right: 0rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  svg {
    width: 2.8rem;
    height: 2.8rem;
    fill: ${() => colors.dark.text.original};
  }
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
