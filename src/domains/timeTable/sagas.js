import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { requestStart, requestSuccess, requestError } from "./slice";
import handleError from "../errors";

export function* getTimeTableEffectSaga(action) {
  try {
    const { network, line, station, missions } = action.payload;
    const result = yield call(
      getTimeTablePromise,
      network,
      line,
      station,
      missions
    );
    if (!result) {
      throw Error("no data from the server");
    }
    yield put({ type: requestSuccess.type, payload: result.data });
  } catch (rawError) {
    const error = handleError(rawError);
    yield put({ type: requestError.type, payload: error });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(requestStart.type, getTimeTableEffectSaga);
}
