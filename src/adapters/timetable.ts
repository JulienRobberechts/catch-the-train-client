import axios from "axios";

import config from "../config";
import { FullJourney } from "../domains/journey/types";

/** function that returns an axios call promise */
export function getTimeTablePromise({
  network,
  line,
  departure,
  destination,
}: FullJourney) {
  const url =
    config.SERVER_ROOT_URL +
    `/next-trains/${network}/${line}/${departure}/${destination}`;
  // const params = {
  //   missions: missions ? missions : undefined,
  // };
  // console.log("CALL API getTimeTable", url, params);
  return axios.get(url);
}
