import moment from "moment";
import DelayStatus from "../toTheStation/pure/delayStatus";

export interface EnhanceTimeTable {
  currentDeparture?: {
    index: number;
    code: string;
  };
  travel?: {
    nowTime: moment.Moment;
    travelDuration: moment.Duration;
    accessDuration: moment.Duration;
  };
  enhancedDepartures?: EnhancedDeparture[];
}

export interface EnhancedDeparture {
  departureIndex: number;
  trainCode: string;
  
  departureTime:  moment.Moment;
  departureDuration:  moment.Duration;

  delayDuration:  moment.Duration;
  delayStatus:  DelayStatus;
  onTimeMarginDelaySeconds: number;
}
