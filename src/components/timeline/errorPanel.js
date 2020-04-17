import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import {
  RefreshIcon,
  UnknownErrorIcon,
  UnavailableErrorIcon,
  NoConnectionErrorIcon,
  NoDepartureErrorIcon,
} from "../../design/icons";

const getMessageByErrorCode = (errorCode) => {
  switch (errorCode) {
    case 503:
      return {
        message1: "L'application n'est pas disponible pour l'instant.",
        message2: "Merci de re tenter plus tard.",
        icon: "UnavailableErrorIcon",
      };
    case 533:
      return {
        message1: "Petit problème de connexion.",
        message2: "merci de verifiez votre connexion internet.",
        icon: "NoConnectionErrorIcon",
      };
    case 703:
      return {
        message1: "Il n'y a pas de train au départ affiché en gare",
        message2: "pour l'instant...",
        icon: "NoDepartureErrorIcon",
      };
    default:
      return {
        message1: "Oups! Nous vivons une expérience paranormale",
        message2: "Nous travaillons à rétablir l'ordre dans l'univers",
        icon: "UnknownErrorIcon",
      };
  }
};

const ErrorPanel = ({ error }) => {
  const { message1, message2, icon } = getMessageByErrorCode(error.errorCode);
  return (
    <div>
      {error && (
        <div>
          <ErrorSection>
            <ErrorText1>{message1}</ErrorText1>
            <ErrorIconContainer
              className="ui icon"
              onClick={() => {
                window.location.reload();
              }}
            >
              {icon === "UnknownErrorIcon" && <UnknownErrorIcon />}
              {icon === "UnavailableErrorIcon" && <UnavailableErrorIcon />}
              {icon === "NoConnectionErrorIcon" && <NoConnectionErrorIcon />}
              {icon === "NoDepartureErrorIcon" && <NoDepartureErrorIcon />}
            </ErrorIconContainer>
            <ErrorText2>{message2}</ErrorText2>
          </ErrorSection>
          <RefreshSection
            onClick={() => {
              window.location.reload();
            }}
          >
            <RefreshIconContainer className="ui icon">
              <RefreshIcon />
            </RefreshIconContainer>
            <RefreshText></RefreshText>
          </RefreshSection>
        </div>
      )}
    </div>
  );
};

const ErrorSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e6716e;
  font-size: 1.2rem;
`;

const ErrorText = styled.div`
  margin: 0 auto;
`;

const ErrorText1 = styled(ErrorText)`
  font-size: 1.2rem;
`;

const ErrorText2 = styled(ErrorText)`
  font-size: 0.8rem;
`;

const ErrorIconContainer = styled.div`
  margin: 2rem;
  svg {
    width: 7rem;
    height: 7rem;
    fill: ${() => colors.dark.text.warning};
  }
`;

const RefreshSection = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #60a38e;
  font-size: 1.2rem;
`;

const RefreshText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
`;

const RefreshIconContainer = styled.div`
  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: ${() => colors.dark.text.original};
  }

  svg:hover {
    fill: ${() => colors.dark.text.highlight};
  }
`;

export default ErrorPanel;
