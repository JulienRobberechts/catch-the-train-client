import DELAY_STATUS from "../../domains/toTheStation/pure/delayStatus";
import { colors } from "../../design/colors";

const fontColorForDelayStatus = (delayStatus) => {
  switch (delayStatus) {
    case DELAY_STATUS.EARLY:
      return colors.dark.text.original;
    case DELAY_STATUS.LATE:
      return colors.dark.text.warning;
    default:
      return colors.dark.text.highlight;
  }
};

export { fontColorForDelayStatus };
