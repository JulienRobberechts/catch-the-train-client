import axios from "axios";

import { SERVER_ROOT_URL } from "../config";

/** function that returns an axios call */
export function getTimeTablePromise() {
  // console.log("getTimeTable start *********************************");
  const url = SERVER_ROOT_URL + "/schedules";
  return axios.request(url);
}
