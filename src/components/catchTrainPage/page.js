import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";
import TimeTable from "../timeTable";
import { mock as mockToTheStation } from "../../domains/toTheStation/slice";
import {
  selectStationCode,
  mock as mockTimeTable
} from "../../domains/timeTable/slice";

const CatchPage = () => {
  const { station, direction, departureTimeCode } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mockToTheStation());
    dispatch(mockTimeTable());
  });

  const stationAvailable = useSelector(selectStationCode);
  console.log("selectStationCode = ", stationAvailable);

  return (
    <>
      <Helmet>
        <title>Trains - {station}</title>
      </Helmet>
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
