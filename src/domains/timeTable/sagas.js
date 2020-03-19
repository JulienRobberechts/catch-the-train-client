import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetch } from "./slice";
import { SERVER_ROOT_URL } from "../../config";

// const delay = ms => new Promise(res => setTimeout(res, ms));

/** function that returns an axios call */
export function getTimeTable() {
  // console.log("getTimeTable start *********************************");
  const url = SERVER_ROOT_URL + "/schedules";
  return axios.request(url);
}

export function* getTimeTableEffectSaga(action) {
  try {
    const result = yield call(getTimeTable);
    // console.log("RESULT----------------------------", result);
    if (!result) {
      throw Error("no data from the server");
    }
    yield put({ type: "timeTable/fetchSuccess", payload: result.data });
    // console.log("getTimeTableEffectSaga 3");
  } catch (error) {
    console.log("error : ", error);
    yield put({ type: "timeTable/fetchError" });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(fetch.type, getTimeTableEffectSaga);
}
