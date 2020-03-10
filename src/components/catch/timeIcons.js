import { Clock, TrainDark, Sandglass, Walk } from "../../design";

export default iconName => {
  switch (iconName.toLowerCase()) {
    case "clock":
      return Clock;
    case "traindark":
      return TrainDark;
    case "sandglass":
      return Sandglass;
    case "walk":
      return Walk;
    default:
      return null;
  }
};
