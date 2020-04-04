import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { useSelector } from "react-redux";
import { selectRoute } from "../../domains/timeTable/selectors";

const TrainRoute = () => {
  const route = useSelector(selectRoute);

  if (!route) {
    return <Panel>...</Panel>;
  }

  return (
    <Panel>
      <span>
        {route.type}/{route.line}/{route.station}
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
