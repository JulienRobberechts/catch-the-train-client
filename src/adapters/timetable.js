import axios from "axios";

import { SERVER_ROOT_URL } from "../config";

/** function that returns an axios call promise */
export function getTimeTablePromise({ network, line, station, missions }) {
  const url = SERVER_ROOT_URL + `/next-trains/${network}/${line}/${station}?`;
  const params = {
    missions: missions ? missions : undefined,
  };
  // console.log("getTimeTable url = ", url);
  console.log("CALL API getTimeTable", url, params);
  return axios.request(url, { params });
}
