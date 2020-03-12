import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TrainRoute = ({ route }) => {
  return (
    <Panel>
      <span>{route.station}</span>
      {route.direction && (
        <>
          <span> > </span>
          <span>{route.direction}</span>
        </>
      )}
    </Panel>
  );
};

const Panel = styled.div`
  background: ${() => colors.dark.background};
  color: ${() => colors.dark.text.highlight};
  padding: 0.3rem;
  font-size: 0.8em;
`;

export default TrainRoute;
