import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { fetch, fetchSuccess, fetchError } from "./slice";

export function* getTimeTableEffectSaga(action) {
  try {
    const { type, line, station, missions } = action.payload;
    const result = yield call(
      getTimeTablePromise,
      type,
      line,
      station,
      missions
    );
    if (!result) {
      throw Error("no data from the server");
    }
    yield put({ type: fetchSuccess.type, payload: result.data });
  } catch (error) {
    console.log("error : ", error);
    yield put({ type: fetchError.type });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(fetch.type, getTimeTableEffectSaga);
}
