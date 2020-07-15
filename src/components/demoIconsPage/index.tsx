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
  Reader2,
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
          <Reader2 /> 20-30 min
        </IconContainer>
        <IconContainer>
          <Chill />> 30 min
        </IconContainer>
        <IconContainer>
          <Golf />> 30 min
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
          <Reader2 /> 20-30 min
        </IconContainer>
      </Panel>
      Now
      <Panel color="#28b463">
        <IconContainer>
          <Man />
          Now
        </IconContainer>
        <IconContainer>
          <Push />
          Now
        </IconContainer>
        <IconContainer>
          <Jump />
          now
        </IconContainer>
      </Panel>
      Walk Slowly
      <Panel color="#28b463">
        <IconContainer>
          <Walk3 />
          Walk very Slowly
        </IconContainer>
        <IconContainer>
          <Trip />
          Walk Slowly
        </IconContainer>
        <IconContainer>
          <Walk2 />
          Walk Slowly
        </IconContainer>
        <IconContainer>
          <WalkingWithDog />
          Walk Slowly
        </IconContainer>
        <IconContainer>
          <Girl />
          Walk Slowly
        </IconContainer>
        <IconContainer>
          <Walk4 />
          Walk
        </IconContainer>
        <IconContainer>
          <WalkingNow />
          Walk
        </IconContainer>
      </Panel>
      Walk Fast
      <Panel color="#f8c471">
        <IconContainer>
          <Run3 />
          Walk fast
        </IconContainer>

        <IconContainer>
          <School />
          Walk Fast
        </IconContainer>
      </Panel>
      Walk Very Fast
      <Panel color="#f39c12">
        <IconContainer>
          <Run3 />
          Walk fast
        </IconContainer>

        <IconContainer>
          <School />
          Walk Fast
        </IconContainer>
      </Panel>
      Run
      <Panel color="#ec7063">
        <IconContainer>
          <Run />
          Run
        </IconContainer>
        <IconContainer>
          <Run4 />
          Run
        </IconContainer>
        <IconContainer>
          <Run5 />
          Run
        </IconContainer>
      </Panel>
      Run fast
      <Panel color="#cb4335">
        <IconContainer>
          <RunFast /> Run fast
        </IconContainer>
        <IconContainer>
          <Run2 /> Run fast
        </IconContainer>
      </Panel>
      Impossible
      <Panel color="#922b21">
        <IconContainer>
          <Cape />
          Impossible
        </IconContainer>
      </Panel>
      Schedule unknown
      <Panel color="#5b5a59">
        <IconContainer>
          <Careless />
          schedule unknown
        </IconContainer>
      </Panel>
      Tous:
      <Panel color="#5b5a59">
        <IconContainer>
          <Cape />
        </IconContainer>
        <IconContainer>
          <Careless />
        </IconContainer>
        <IconContainer>
          <Chill />
        </IconContainer>
        <IconContainer>
          <Girl />
        </IconContainer>
        <IconContainer>
          <Golf />
        </IconContainer>
        <IconContainer>
          <Jump />
        </IconContainer>
        <IconContainer>
          <Lean />
        </IconContainer>
        <IconContainer>
          <Man />
        </IconContainer>
        <IconContainer>
          <Plant />
        </IconContainer>
        <IconContainer>
          <Push />
        </IconContainer>
        <IconContainer>
          <Read />
        </IconContainer>
        <IconContainer>
          <Reader />
        </IconContainer>
        <IconContainer>
          <Reader2 />
        </IconContainer>
        <IconContainer>
          <Run />
        </IconContainer>
        <IconContainer>
          <RunFast />
        </IconContainer>
        <IconContainer>
          <Run2 />
        </IconContainer>
        <IconContainer>
          <Run3 />
        </IconContainer>
        <IconContainer>
          <Run4 />
        </IconContainer>
        <IconContainer>
          <Run5 />
        </IconContainer>
        <IconContainer>
          <School />
        </IconContainer>
        <IconContainer>
          <Trip />
        </IconContainer>
        <IconContainer>
          <Walk2 />
        </IconContainer>
        <IconContainer>
          <Walk3 />
        </IconContainer>
        <IconContainer>
          <Walk4 />
        </IconContainer>
        <IconContainer>
          <WalkingNow />
        </IconContainer>
        <IconContainer>
          <WalkingWithDog />
        </IconContainer>
        <IconContainer>
          <Work />
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
