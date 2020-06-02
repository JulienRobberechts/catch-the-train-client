import React from "react";
import styled from "styled-components";
import TimeSelection from "./TimeSelection";

interface Props {
  duration: number;
  height: number;
  backgroundColor: string;
  highlighted: boolean;
  onDurationChangedByUser: (duration: number) => void;
}

const TopPanel: React.FC<Props> = ({
  duration,
  highlighted,
  onDurationChangedByUser,
  height,
  backgroundColor,
}) => {
  // console.log("duration :>> ", duration);
  return (
    <Container height={height} backgroundColor={backgroundColor}>
      <PanelLayout>
        <Title>Temps de trajet</Title>
        <TimeSelection
          duration={duration}
          highlighted={highlighted}
          onDurationChangedByUser={onDurationChangedByUser}
        />
        <Button>Valider</Button>
      </PanelLayout>
    </Container>
  );
};

const Container = styled.div<{ height: number; backgroundColor: string }>`
  margin: 0;
  background: black;
  color: white;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.backgroundColor};
`;

const Title = styled.div`
  margin: 0.1rem;
  font-size: 1.4rem;
`;

const PanelLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 0;
  padding: 0.6rem 2rem;
  margin: 0.4rem;
  border-radius: 4px;
  border: 2px solid #e0ab19;
  background: #252149;
  font-size: 1.2rem;
  color: #e0ab19;
`;

export default TopPanel;
