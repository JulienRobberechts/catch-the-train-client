import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../../design/icons";
import { Link } from "react-router-dom";
import { colors } from "../../design/colors";

interface Props {}

const ApplicationCover: React.FC<Props> = () => {
  return (
    <Background>
      <Card as={Link} to={`/start`}>
        <CardContent>
          <Line1>
            <LogoIconContainer className="ui icon">
              <LogoIcon />
            </LogoIconContainer>{" "}
            <LogoText>
              <div>Attraper</div>

              <LogoTextLeTrain>
                <span>l</span>e train
              </LogoTextLeTrain>
            </LogoText>
          </Line1>
          <Line1>
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
          </Line1>
        </CardContent>
      </Card>
    </Background>
  );
};

const AppName = styled.div`
  font-style: italic;
`;
const RestOfPhrase = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.3rem;
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

const Background = styled.div`
  background: #5b5a59;
`;

const Card = styled.div`
  background: ${() => colors.dark.background};
  width: 1280px;
  height: 640px;
  margin: 40px;
  display: flex;
`;

const CardContent = styled.div`
  margin: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const Line1 = styled.div`
  display: flex;
`;

const LogoText = styled.div`
  font-size: 3rem;
  color: ${() => colors.dark.text.original};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  font-size: 1.4em;
  color: #ddd;
  white-space: nowrap;
`;

const LogoIconContainer = styled.div`
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  svg {
    width: 7rem;
    height: 7rem;
    fill: ${() => colors.dark.text.original};
  }
`;

export default ApplicationCover;
