import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { useSelector } from "react-redux";
import { selectRoute } from "../../domains/timeTable/slice";
const TrainRoute = () => {
  const route = useSelector(selectRoute);
  console.log("route", route);

  if (!route) {
    return <Panel>...</Panel>;
  }

  return (
    <Panel>
      <span>
        {route.station.name} ({route.station.code})
      </span>
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
