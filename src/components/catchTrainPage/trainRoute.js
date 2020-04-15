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
  const stationName = getStationBySlug(request?.station)?.name;
  const destination = "Paris";

  return (
    <Panel>
      <span>
        {network} {line} - {stationName} > {destination}
      </span>
    </Panel>
  );
};

const Panel = styled.div`
  background: ${() => colors.dark.background};
  color: ${() => colors.dark.text.original};
  padding: 0.3rem;
  font-size: 1rem;
`;

export default TrainRoute;
