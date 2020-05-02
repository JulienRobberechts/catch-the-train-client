import axios from "axios";

import config from "../config";
import { RatpJourney } from "../domains/journey/types";

/** function that returns an axios call promise */
export function getTimeTablePromise({
  network,
  line,
  departure,
  missions,
}: RatpJourney) {
  const url =
    config.SERVER_ROOT_URL + `/next-trains/${network}/${line}/${departure}?`;
  const params = {
    missions: missions ? missions : undefined,
  };
  // console.log("CALL API getTimeTable", url, params);
  return axios.get(url, { params });
}
