import React from "react";
import styled from "styled-components";
// import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { colors } from "../../design/colors";

// sample links:
const network = "rers";
const line = "a";
const station = "chatelet+les+halles";
const missions = "";

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
      <Link to="/selection">
        <PrimaryButton>Choix du train</PrimaryButton>
      </Link>
      <Link to={`/${network}/${line}/${station}?missions=${missions}`}>
        <SecondaryButton>
          <div>Chatelet les halles > </div>
          <div>Saint-Germain-en-Laye</div>
        </SecondaryButton>
      </Link>
      <Link to="/settings">
        <SecondaryButton>Paramètres</SecondaryButton>
      </Link>
    </Panel>
  );
};

const Panel = styled.div`
  margin: 1rem;
  text-align: center;

  font-family: azo-sans-web, Arial, sans-serif;

  display: flex;
  flex-direction: column;
`;

const Need = styled.div`
  margin: 0.8rem 0;
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
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  color: ${() => colors.dark.text.highlight};
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
`;

const SecondaryButton = styled.button`
  margin: 0.3rem 2rem;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  background: ${() => colors.dark.panel.one.background};
  color: ${() => colors.dark.panel.one.text.normal};
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  margin: 1.3rem;
  padding: 2rem;
  border-radius: 1rem;
  background: ${() => colors.dark.panel.special.background};
  color: ${() => colors.dark.panel.special.text.normal};
  font-size: 1.6rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const AppName = styled.div`
  font-style: italic;
`;
const RestOfPhrase = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.3rem;
`;

export default StartPage;
