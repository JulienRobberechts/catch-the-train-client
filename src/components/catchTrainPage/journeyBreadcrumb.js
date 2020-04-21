import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { useSelector } from "react-redux";
import { selectTimeTableRequest } from "../../domains/timeTable/selectors";

import {
  getLineByKey,
  getNetworkByKey,
  getStationBySlug,
} from "../../domains/journey/service";

const JourneyBreadcrumb = () => {
  const request = useSelector(selectTimeTableRequest);

  if (!request) {
    return <Panel>...</Panel>;
  }
  const { network, line, departure, destination } = request;
  const networkName = getNetworkByKey(network)?.name;
  const lineName = getLineByKey(line)?.name;
  const departureName = getStationBySlug(departure)?.name;
  const destinationName = getStationBySlug(destination)?.name;

  return (
    <Panel>
      <span>
        {networkName} {lineName} - {departureName} > {destinationName}
      </span>
    </Panel>
  );
};

const Panel = styled.div`
  background: ${() => colors.dark.background};
  color: ${() => colors.dark.text.original};
  padding: 0.3rem;
  font-size: 1rem;
  font-weight: 700;
`;

export default JourneyBreadcrumb;
