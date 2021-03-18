import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise, TimeTableResponse } from "../../adapters/timetable";
import { requestStart, requestSuccess, requestError } from "./slice";
import handleError from "../errors";
import ErrorCodes from "../errors/errorCodes";
import ClientError from "../errors/clientError";
import { FullJourney } from "../journey/types";

export function* getTimeTableEffectSaga(action: PayloadAction<FullJourney>) {
  try {
    const result: TimeTableResponse = yield call(getTimeTablePromise, action.payload);

    const departures = result?.data?.departures;
    if (departures && departures.length === 0) {
      /// No departure is consider a an error 1001
      throw new ClientError(ErrorCodes.ERROR_1001_TIMETABLE_NO_DEPARTURE);
    }

    yield put({ type: requestSuccess.type, payload: result?.data });
  } catch (incomingError) {
    const publicError = handleError(incomingError);
    yield put({ type: requestError.type, payload: publicError });
  }
}

// watcher Saga
export function* timeTableSagas() {
  yield takeLatest(requestStart.type, getTimeTableEffectSaga);
}
