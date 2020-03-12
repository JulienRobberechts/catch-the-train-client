import React from "react";
import styled from "styled-components";
// import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { colors } from "../../design/colors";

const StartPage = () => {
  return (
    <Panel>
      <Need>
        <Verb1>Voir</Verb1> votre prochain train...
      </Need>
      <Need>
        <Verb2>Calculer</Verb2> le temps necessaire pour y aller...
      </Need>
      <Need>
        <Verb3>Partir</Verb3> exactement au bon moment...
      </Need>
      <PropositionValue>
        <AppName>'Attraper le train'</AppName>
        <RestOfPhrase>vous aide pour cela</RestOfPhrase>
      </PropositionValue>
      <Link to="/settings">
        <GoButton>Selectionnez votre train</GoButton>
      </Link>
    </Panel>
  );
};

const Panel = styled.div`
  margin: 1rem;
  text-align: center;

  font-family: azo-sans-web, Arial, sans-serif;
`;

const Need = styled.div`
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const Verb = styled.div`
  font-style: italic;
  font-size: 180%;
`;

const Verb1 = styled(Verb)`
  color: ${() => colors.dark.text.highlight};
`;

const Verb2 = styled(Verb)`
  color: ${() => colors.dark.text.warning};
`;

const Verb3 = styled(Verb)`
  color: ${() => colors.dark.text.original};
`;

const PropositionValue = styled.div`
  margin: 1.3rem;
  padding: 2rem;
  border-radius: 1rem;
  color: ${() => colors.dark.text.highlight};
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
`;

const GoButton = styled.button`
  margin: 1.3rem;
  padding: 2rem;
  border-radius: 1rem;
  background: ${() => colors.dark.panel.special.background};
  color: ${() => colors.dark.panel.special.text.normal};
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
`;

const AppName = styled.div`
  font-style: italic;
`;
const RestOfPhrase = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.3rem;
`;

export default StartPage;