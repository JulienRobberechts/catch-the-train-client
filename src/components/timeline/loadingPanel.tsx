import React from "react";
import styled from "styled-components";
interface Props {
  departureName: string | undefined;
}

const LoadingPanel: React.FC<Props> = ({ departureName }) => {
  return (
    <LoadingSection>
      <LoadingText1>recherche des prochains départs...</LoadingText1>
      {departureName && (
        <LoadingText2>
          en gare de '<StationName>{departureName}</StationName>'
        </LoadingText2>
      )}
    </LoadingSection>
  );
};

const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e0ab19;
  font-size: 1.2rem;
`;
const LoadingText = styled.div`
  margin: 0 auto;
`;

const LoadingText1 = styled(LoadingText)``;

const LoadingText2 = styled(LoadingText)`
  font-size: 0.8rem;
`;

const StationName = styled.span`
  font-weight: 600;
`;

export default LoadingPanel;
