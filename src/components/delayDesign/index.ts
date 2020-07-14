import DelayStatus from "../../domains/toTheStation/pure/delayStatus";

const getColorForDelayStatus = (delayStatus: DelayStatus) => {
  switch (delayStatus) {
    case DelayStatus.TooEarly:
      return "#186a3b";
    case DelayStatus.Early:
      return "#239b56";
    case DelayStatus.OnTime:
      return "#28b463";
    case DelayStatus.LateWalkFast:
      return "#f8c471";
    case DelayStatus.LateWalkVeryFast:
      return "#f39c12";
    case DelayStatus.LateRun:
      return "#ec7063";
    case DelayStatus.LateRunFast:
      return "#cb4335";
    case DelayStatus.TooLate:
      return "#922b21";
    default:
      return "#5b5a59";
  }
};

export { getColorForDelayStatus };
