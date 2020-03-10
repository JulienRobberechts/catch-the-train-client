import React from "react";
import {
  Clock,
  ClockDark,
  Sandglass,
  SandglassDark,
  Bus,
  BusDark,
  Train,
  TrainDark,
  Walk
} from ".";

const DemoIcons = () => {
  return (
    <div>
      <div>
        Clock:
        <Clock width="5%" height="5%" />
        <ClockDark width="5%" height="5%" />
      </div>
      <div>
        Sandglass:
        <Sandglass width="5%" height="5%" />
        <SandglassDark width="5%" height="5%" />
      </div>
      <div>
        Bus:
        <Bus width="5%" height="5%" />
        <BusDark width="5%" height="5%" />
      </div>
      <div>
        Train:
        <Train width="5%" height="5%" />
        <TrainDark width="5%" height="5%" />
      </div>
      <div>
        Walk:
        <Walk width="5%" height="5%" />
      </div>
    </div>
  );
};

export default DemoIcons;
