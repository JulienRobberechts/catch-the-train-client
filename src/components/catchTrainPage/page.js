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
import { Search } from "../../design/icons";

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
          <IconContainer
            className="ui circular icon"
            as={Link}
            to={`/selection`}
          >
            <Search />
          </IconContainer>
        </StationHeader>
        <TimeTable />
      </TopSection>
      <BodySection>
        <TimelineVertical />
      </BodySection>
    </>
  );
};

const IconContainer = styled.div`
  margin: 0.2rem 2rem;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.original};
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
