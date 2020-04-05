import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { requestStart, requestSuccess, requestError } from "./slice";
import handleError from "../errors";

export function* getTimeTableEffectSaga(action) {
  try {
    const timeTableParameters = action.payload;
    const result = yield call(getTimeTablePromise, timeTableParameters);
    yield put({ type: requestSuccess.type, payload: result?.data });
  } catch (rawError) {
    const error = handleError(rawError);
    yield put({ type: requestError.type, payload: error });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(requestStart.type, getTimeTableEffectSaga);
}
