import React from "react";

import TrainRoute from "./trainRoute";
import LateSummary from "./lateSummary";
import Timeline from "./timeline";
import DemoIcons from "../icons/demo-icons";

const CatchPage = () => {
  return (
    <div>
      <div>Catch the train</div>
      <TrainRoute />
      <Timeline />
      <LateSummary />
      <DemoIcons />
    </div>
  );
};

export default CatchPage;
