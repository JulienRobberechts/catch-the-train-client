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
import { getUiError } from "../../domains/errors/uiErrorMapping";

const ErrorPanel = ({ error }) => {
  const { message1, message2, icon } = getUiError(error);
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
