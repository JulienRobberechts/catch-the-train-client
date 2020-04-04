import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";
import TimeTable from "../timeTable";
import PageRefresher from "./pageRefresher";
import config from "../../config";

const refreshInterval = config.DISABLE_TIME_UPDATE ? 36000000 : 1000;

const CatchPage = ({ station }) => {
  return (
    <>
      <Helmet>
        <title>Trains - {station ?? "..."}</title>
      </Helmet>
      <PageRefresher refreshInterval={refreshInterval} />
      <TopSection>
        <TrainRoute />
        <TimeTable />
      </TopSection>
      <BodySection>
        <TimelineVertical />
      </BodySection>
    </>
  );
};

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
