import React from "react";
import { Clock, Sandglass, Bus, Train, Walk } from "./icons";

const DemoIcons = () => {
  return (
    <div>
      <div>
        Clock:
        <Clock width="5%" height="5%" />
      </div>
      <div>
        Sandglass:
        <Sandglass width="5%" height="5%" />
      </div>
      <div>
        Bus:
        <Bus width="5%" height="5%" />
      </div>
      <div>
        Train:
        <Train width="5%" height="5%" />
      </div>
      <div>
        Walk:
        <Walk width="5%" height="5%" />
      </div>
    </div>
  );
};

export default DemoIcons;
