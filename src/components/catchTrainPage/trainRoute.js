import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { useSelector } from "react-redux";
import { selectRoute } from "../../domains/timeTable/selectors";

const TrainRoute = () => {
  const { context } = useSelector(selectRoute);

  if (!context) {
    return <Panel>...</Panel>;
  }

  const { type, line, station } = context;

  return (
    <Panel>
      <span>
        {type}/{line}/{station}
      </span>
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
