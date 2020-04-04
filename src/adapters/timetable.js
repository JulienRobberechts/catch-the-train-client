import axios from "axios";

import { SERVER_ROOT_URL } from "../config";

/** function that returns an axios call promise */
export function getTimeTablePromise(type, line, station) {
  const url = SERVER_ROOT_URL + `/next-trains/${type}/${line}/${station}`;
  // console.log("getTimeTable url = ", url);
  return axios.request(url);
}
