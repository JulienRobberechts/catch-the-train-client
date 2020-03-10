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
  background-color: ${() => colors.color2};
  color: ${() => colors.color5};
  padding: 0.3rem;
  font-size: 0.8em;
`;

export default TrainRoute;
