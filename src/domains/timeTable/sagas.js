import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetch } from "./slice";

// const delay = ms => new Promise(res => setTimeout(res, ms));

/** function that returns an axios call */
export function getTimeTable() {
  // console.log("getTimeTable start *********************************");
  return axios.request("http://localhost:3034/schedules");
}

export function* getTimeTableEffectSaga(action) {
  try {
    const result = yield call(getTimeTable);
    // console.log("RESULT----------------------------", result);
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
