import React, { useEffect } from "react";
import styled from "styled-components";

import { selectData } from "../../domains/toTheStation/slice";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";

import TimeTable from "../timeTable";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { selectStationCode, mock } from "../../domains/timeTable/slice";
import { useParams } from "react-router-dom";

const CatchPage = () => {
  const { station, direction, departureTimeCode } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `XXX`;
    console.log("useEffect before mock config");
    // dispatch(mock());
    dispatch(mock());
  });

  const stationAvailable = useSelector(selectStationCode);
  console.log("stationAvailable", stationAvailable);

  const data = useSelector(selectData);
  console.log("data", data);

  if (!data) {
    return (
      <div>
        Loading
        <button onClick={() => dispatch(mock())}>mock</button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Trains - {station}</title>
      </Helmet>
      <button onClick={() => dispatch(mock())}>mock</button>
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
