import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { useSelector } from "react-redux";
import { selectTimeTableRequest } from "../../domains/timeTable/selectors";

import { getStationBySlug } from "../../domains/journey/service";

const TrainRoute = () => {
  const request = useSelector(selectTimeTableRequest);

  if (!request) {
    return <Panel>...</Panel>;
  }

  const { network, line } = request;
  const stationName = getStationBySlug(request?.station);

  return (
    <Panel>
      <span>
        {network}/{line}/{stationName}
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
