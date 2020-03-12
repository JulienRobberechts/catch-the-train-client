import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

import { SelectData } from "./logic/catchSelector";
import TrainRoute from "./trainRoute";
import TimelineVertical from "../timeline/timelineVertical";
import AppTitle from "./appTitle";
import TrainSchedule from "../trainSchedule/trainSchedule";

const CatchPage = () => {
  const data = SelectData();

  return (
    <Page>
      <Header>
        <AppTitle />
        <TrainRoute {...data} />
        <TrainSchedule {...data} />
      </Header>
      <Body>
        <TimelineVertical {...data} />
      </Body>
    </Page>
  );
};

const Page = styled.div`
  background: ${() => colors.dark.background};
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 0.7rem;
`;

const Body = styled.div`
  flex-grow: 2;
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
`;

export default CatchPage;
