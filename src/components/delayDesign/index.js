import { colors } from "../../design/colors";

const fontColorForDelayStatus = delayStatus => {
  switch (delayStatus) {
    case "early":
      return colors.dark.text.original;
    case "late":
      return colors.dark.text.warning;
    default:
      return colors.dark.text.highlight;
  }
};

export { fontColorForDelayStatus };
