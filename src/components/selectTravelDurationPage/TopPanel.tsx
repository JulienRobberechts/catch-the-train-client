import React from "react";
import styled from "styled-components";
import TimeSelection from "./TimeSelection";

interface Props {
  duration: number;
  heightRem: number;
  backgroundColor: string;
  highlighted: boolean;
  onDurationChangedByUser: (duration: number) => void;
  onValidate: (duration: number) => void;
}

const TopPanel: React.FC<Props> = ({
  duration,
  highlighted,
  heightRem,
  backgroundColor,
  onDurationChangedByUser,
  onValidate,
}) => {
  return (
    <Container heightRem={heightRem} backgroundColor={backgroundColor}>
      <PanelLayout>
        <TimeSelection
          duration={duration}
          highlighted={highlighted}
          onDurationChangedByUser={onDurationChangedByUser}
        />
        <Button onClick={() => onValidate(duration)}>Valider</Button>
      </PanelLayout>
    </Container>
  );
};

const Container = styled.div<{ heightRem: number; backgroundColor: string }>`
  margin: 0;
  background: black;
  color: white;
  height: ${(props) => props.heightRem}rem;
  background-color: ${(props) => props.backgroundColor};
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
