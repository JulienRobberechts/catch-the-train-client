import { Clock, Train, Sandglass, Walk } from "../../design/icons";

export default iconName => {
  switch (iconName.toLowerCase()) {
    case "clock":
      return Clock;
    case "train":
      return Train;
    case "sandglass":
      return Sandglass;
    case "walk":
      return Walk;
    default:
      return null;
  }
};
