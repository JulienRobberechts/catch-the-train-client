import DelayStatus from "./delayStatus";
import { Duration } from "moment";

const walkNominalSpeed = 4.6;
const percentageOfAccessTimeYouCanRun = 40;

function getDelayStatus(
  departureDuration: Duration,
  travelDuration: Duration,
  accessDuration: Duration
) {
  const availableDuration = departureDuration.asSeconds();
  const estimatedDuration =
    travelDuration.asSeconds() + accessDuration.asSeconds();

  if (availableDuration > estimatedDuration + 30 * 60) {
    return DelayStatus.TooEarly;
  }
  if (availableDuration > estimatedDuration + 30) {
    return DelayStatus.Early;
  }

  // Calculation for on-time or late
  const durationForRunning =
    (accessDuration.asSeconds() * percentageOfAccessTimeYouCanRun) / 100 +
    travelDuration.asSeconds();

  const speed = (durationForRunning / availableDuration) * walkNominalSpeed;

  // console.log("speed :>> ", { speed, availableTime });

  // 4.6 km/h
  if (speed < walkNominalSpeed) {
    return DelayStatus.OnTime;
  }
  // 6km/h
  if (speed < 1.3 * walkNominalSpeed) {
    return DelayStatus.LateWalkFast;
  }
  // 7km/h
  if (speed < 1.55 * walkNominalSpeed) {
    return DelayStatus.LateWalkVeryFast;
  }
  // 9km/h
  if (speed < 1.9 * walkNominalSpeed) {
    return DelayStatus.LateRun;
  }
  // 10km/h
  if (speed < 2.15 * walkNominalSpeed) {
    return DelayStatus.LateRunFast;
  }

  return DelayStatus.TooLate;
}

export { getDelayStatus as default };
