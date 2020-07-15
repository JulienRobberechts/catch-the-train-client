import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import {
  Cape,
  Careless,
  Chill,
  Girl,
  Golf,
  Jump,
  Lean,
  Man,
  Plant,
  Push,
  Read,
  Reader,
  Reader2Right,
  Reader2Left,
  Run,
  RunFast,
  Run2,
  Run3,
  Run4,
  Run5,
  School,
  Trip,
  Walk2,
  Walk3,
  Walk4,
  WalkingNow,
  WalkingWithDog,
  Work,
} from "../../design/icons";
import {
  Alcohol,
  Baggage,
  Fisher,
  Golf2,
  Gymnast,
  Jump2,
  Run6,
  Run7,
  Scooter,
  Skateboard,
  Sleep,
  StandUp,
  Think,
  Wait1,
  Walk5,
  Walk6,
  Walk7,
  Walk8,
} from "../../design/icons";

const DemoIconsPage: React.FC = () => {
  return (
    <Demo>
      Too Early
      <Panel color="#186a3b">
        <IconContainer>
          <Read /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Reader /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Reader2Right /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Reader2Left /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Alcohol />
          >20min
        </IconContainer>
        <IconContainer>
          <Fisher />
          >20min
        </IconContainer>
        <IconContainer>
          <Golf2 />
          >20min
        </IconContainer>
        <IconContainer>
          <Chill />> 30 min
        </IconContainer>
        <IconContainer>
          <Golf />> 30 min
        </IconContainer>
        <IconContainer>
          <Sleep />> 30 min
        </IconContainer>
        <IconContainer>
          <Plant />> 1h
        </IconContainer>
      </Panel>
      Early
      <Panel color="#239b56">
        <IconContainer>
          <Lean />
          5-10 min
        </IconContainer>{" "}
        <IconContainer>
          <Work />
          10-20 min
        </IconContainer>
        <IconContainer>
          <Read /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Reader /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Reader2Right /> 20-30 min
        </IconContainer>
      </Panel>
      Now
      <Panel color="#28b463">
        <IconContainer>
          <Man />
        </IconContainer>
        <IconContainer>
          <Push />
        </IconContainer>
        <IconContainer>
          <Jump />
        </IconContainer>
      </Panel>
      Walk Slowly
      <Panel color="#28b463">
        <IconContainer>
          <Walk3 />
        </IconContainer>
        <IconContainer>
          <Trip />
        </IconContainer>
        <IconContainer>
          <Walk2 />
        </IconContainer>
        <IconContainer>
          <WalkingWithDog />
        </IconContainer>
        <IconContainer>
          <Girl />
        </IconContainer>
        <IconContainer>
          <Walk4 />
        </IconContainer>
        <IconContainer>
          <WalkingNow />
        </IconContainer>
        <IconContainer>
          <Baggage />
        </IconContainer>
        <IconContainer>
          <Walk5 />
        </IconContainer>
        <IconContainer>
          <Walk6 />
        </IconContainer>
        <IconContainer>
          <Walk7 />
        </IconContainer>
      </Panel>
      Walk Fast
      <Panel color="#f8c471">
        <IconContainer>
          <Run3 />
        </IconContainer>
        <IconContainer>
          <School />
        </IconContainer>
        <IconContainer>
          <Walk8 />
        </IconContainer>
      </Panel>
      Walk Very Fast
      <Panel color="#f39c12">
        <IconContainer>
          <Run3 />
        </IconContainer>
        <IconContainer>
          <School />
        </IconContainer>{" "}
        <IconContainer>
          <Jump2 />
        </IconContainer>
      </Panel>
      Run
      <Panel color="#ec7063">
        <IconContainer>
          <Run3 />
        </IconContainer>
        <IconContainer>
          <Run />
        </IconContainer>
        <IconContainer>
          <Run5 />
        </IconContainer>{" "}
        <IconContainer>
          <Run7 />
        </IconContainer>{" "}
        <IconContainer>
          <Jump2 />
        </IconContainer>
      </Panel>
      Run fast
      <Panel color="#cb4335">
        <IconContainer>
          <RunFast />
        </IconContainer>
        <IconContainer>
          <Run2 />
        </IconContainer>{" "}
        <IconContainer>
          <Run4 />
        </IconContainer>
        <IconContainer>
          <Run6 />
        </IconContainer>
        <IconContainer>
          <Scooter />
        </IconContainer>
        <IconContainer>
          <Skateboard />
        </IconContainer>
      </Panel>
      Impossible
      <Panel color="#922b21">
        <IconContainer>
          <Cape />
        </IconContainer>
      </Panel>
      Schedule unknown
      <Panel color="#5b5a59">
        <IconContainer>
          <Careless />
        </IconContainer>
        <IconContainer>
          <Think />
        </IconContainer>
      </Panel>
      Others?
      <Panel color="#5b5a59">
        <IconContainer>
          <StandUp />
        </IconContainer>

        <IconContainer>
          <Wait1 />
        </IconContainer>
        <IconContainer>
          <Gymnast />
        </IconContainer>
      </Panel>
    </Demo>
  );
};

const Demo = styled.div`
  font-size: 1.2rem;
`;

const Panel = styled.div<{ color: string }>`
  margin: 0.2rem 4rem;
  background-color: white;
  color: black;
  font-family: azo-sans-web, Arial, sans-serif;

  display: flex;
  flex-wrap: wrap;

  div {
    svg {
      fill: ${(props) => props.color};
    }
  }
`;

const IconContainer = styled.div`
  margin: 0.5rem;
  position: relative;
  top: 0.3rem;
  width: 5rem;
  svg {
    width: 5rem;
  }

  svg:hover {
    fill: ${() => colors.dark.text.highlight};
  }
`;

export default DemoIconsPage;
