import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";
import TimeTable from "../timeTable";
import PageRefresher from "./pageRefresher";
import config from "../../config";
import { colors } from "../../design/colors";
import { Link } from "react-router-dom";
import { Search as SearchIcon } from "../../design/icons";

const refreshInterval = config.DISABLE_TIME_UPDATE ? 36000000 : 1000;

const CatchPage = ({ station }) => {
  return (
    <>
      <Helmet>
        <title>Prochain trains - {station ?? "..."}</title>
      </Helmet>
      <PageRefresher refreshInterval={refreshInterval} />
      <TopSection>
        <StationHeader>
          <TrainRoute />
          <SearchIconContainer
            className="ui circular icon"
            as={Link}
            to={`/selection`}
          >
            <SearchIcon />
          </SearchIconContainer>
        </StationHeader>
        <TimeTable />
      </TopSection>
      <BodySection>
        <TimelineVertical />
      </BodySection>
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

const TopSection = styled.div`
  padding: 0.7rem;
`;

const BodySection = styled.div`
  flex-grow: 2;
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export default CatchPage;
