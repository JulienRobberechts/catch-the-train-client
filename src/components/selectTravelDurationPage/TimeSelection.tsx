import React from "react";
import styled from "styled-components";

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

interface Props {
  duration: number;
  highlighted: boolean;
  onDurationChangedByUser: (duration: number) => void;
}

const TimeSelection: React.FC<Props> = ({
  duration,
  highlighted,
  onDurationChangedByUser,
}) => {
  return (
    <Layout>
      <Button
        onClick={() => {
          onDurationChangedByUser(Math.floor(duration / 10) * 10 - 10);
        }}
      >
        –
      </Button>
      <Time disabled={!highlighted}>
        <TimeMin>{Math.floor(duration / 60)}</TimeMin>
        <TimeUnit>min</TimeUnit>
        <TimeSec>{zeroPad(Math.floor(duration % 60), 2)}</TimeSec>
      </Time>
      <Button
        onClick={() => {
          onDurationChangedByUser(Math.floor(duration / 10) * 10 + 10);
        }}
      >
        +
      </Button>
    </Layout>
  );
};

const Layout = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  font-size: 2rem;
  color: #60a38e;
  font-weight: bold;
  border-radius: 2rem;
  background-color: transparent;
  border: solid 2px #60a38e;
  width: 3rem;
  height: 3rem;
  padding-top: 0;
  padding-bottom: 0.3rem;
`;

const Time = styled.div<{ disabled: boolean }>`
  font-size: 2.2rem;
  margin: 0 0.8rem;
  color: ${(props) => (props.disabled ? "#AAA" : "#FFF")};
`;

const TimeMin = styled.span`
  font-weight: bold;
`;

const TimeSec = styled.span`
  font-size: 1.8rem;
`;

const TimeUnit = styled.span`
  font-size: 0.8rem;
  margin: 0 0.1rem;
  vertical-align: super;
  font-style: italic;
`;

export default TimeSelection;
