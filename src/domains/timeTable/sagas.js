import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { requestStart, requestSuccess, requestError } from "./slice";

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
  } catch (error) {
    console.log("error : ", error);
    yield put({ type: requestError.type });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(requestStart.type, getTimeTableEffectSaga);
}
