import DelayStatus from "../../domains/toTheStation/pure/delayStatus";
import { colors } from "../../design/colors";

const fontColorForDelayStatus = (delayStatus: DelayStatus) => {
  switch (delayStatus) {
    case DelayStatus.Early:
      return colors.dark.text.original;
    case DelayStatus.Late:
      return colors.dark.text.warning;
    default:
      return colors.dark.text.highlight;
  }
};

export { fontColorForDelayStatus };
