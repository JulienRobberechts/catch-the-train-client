import React from "react";
import styled from "styled-components";

import { SelectData } from "./logic/selector";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";

import TimeTable from "../timeTable";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";

const CatchPage = () => {
  const { station, direction, departureTimeCode } = useParams();
  // console.log({ station, direction, departureTimeCode });
  const data = SelectData({ departureTimeCode });
  // console.log(" data", data);
  return (
    <>
      <Helmet>
        <title>Train à Saint-Germain-en-Laye</title>
      </Helmet>
      <TopSection>
        <TrainRoute {...data} />
        <TimeTable {...data} />
      </TopSection>
      <BodySection>
        <TimelineVertical {...data} />
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
