import React from "react";
import Time from "./time";
import TimeSpan from "./timeSpan";
import moment from "moment";
import DurationLine from "./durationLine";

const Timeline = () => {
  // UTC (Coordinated Universal Time)
  const now = new moment.utc(new Date("2020-03-10T09:22:37Z")).local();
  // console.log("now", now);

  const trainDeparture = new moment.utc(
    new Date("2020-03-10T09:32:00Z")
  ).local(); // UTC (Coordinated Universal Time)
  // console.log("trainDeparture", trainDeparture);

  var durationToTrain = moment.duration(trainDeparture.diff(now));
  // console.log("timeToTrain", durationToTrain);
  // console.log("timeToTrain minutes", durationToTrain.minutes());
  // console.log("timeToTrain seconds", durationToTrain.seconds());

  var travelDuration = moment.duration({
    seconds: 7 * 60 + 25
  });

  // console.log("travelDuration", travelDuration);
  // console.log("travelDuration minutes", travelDuration.minutes());
  // console.log("travelDuration seconds", travelDuration.seconds());

  return (
    <div>
      <div>
        <Time time={now} icon="clock" />
        <TimeSpan timeSpan={durationToTrain} icon="sandglass" />
        <Time time={trainDeparture} icon="traindark" />
      </div>

      <div>
        <TimeSpan timeSpan={travelDuration} icon="walk" />

        <DurationLine ratio={0.29} />
      </div>
    </div>
  );
};

export default Timeline;
