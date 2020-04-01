import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { fetch } from "./slice";

export function* getTimeTableEffectSaga(action) {
  try {
    const result = yield call(getTimeTablePromise);
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
