import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import JourneyBreadcrumb from "./journeyBreadcrumb";
import TimeTable from "../timeTable";
import useCatchTrainPageRefresher from "./useCatchTrainPageRefresher";
import config from "../../config";
import { colors } from "../../design/colors";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "../../design/icons";

const refreshInterval = config.DISABLE_TIME_UPDATE ? 36000000 : 5000;

interface Props {
  stationName?: string;
}

const CatchPage: React.FC<Props> = ({ stationName }) => {
  useCatchTrainPageRefresher(refreshInterval);
  return (
    <>
      <Helmet>
        <title>Prochain trains - {stationName ?? "..."}</title>
      </Helmet>
      <MainSection>
        <StationHeader>
          <JourneyBreadcrumb />
          <SearchIconContainer
            className="ui circular icon"
            as={Link}
            to={`/select-journey`}
          >
            <SearchIcon />
          </SearchIconContainer>
        </StationHeader>
        <TimeTable />
      </MainSection>
    </>
  );
};

const SearchIconContainer = styled.div`
  margin-right: 0.5rem;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.original};
  }

  svg:hover {
    fill: ${() => colors.dark.text.highlight};
  }
`;

const StationHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainSection = styled.div`
  padding: 0.7rem;
`;

export default CatchPage;
