import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";
import TimeTable from "../timeTable";
import PageRefresher from "./pageRefresher";

const CatchPage = ({ station }) => {
  return (
    <>
      <Helmet>
        <title>Trains - {station ?? "..."}</title>
      </Helmet>
      <PageRefresher refreshInterval={1000} />
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
