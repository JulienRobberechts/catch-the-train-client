import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const TrainRoute = ({ station, direction }) => {
  return (
    <Panel>
      <span>{station}</span>
      {direction && (
        <>
          <span> > </span>
          <span>{direction}</span>
        </>
      )}
    </Panel>
  );
};

const Panel = styled.div`
  background: ${() => colors.dark.background};
  color: ${() => colors.dark.text.original};
  padding: 0.3rem;
  font-size: 0.8em;
`;

export default TrainRoute;
