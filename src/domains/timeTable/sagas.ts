import { PayloadAction } from "@reduxjs/toolkit";
import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTablePromise } from "../../adapters/timetable";
import { requestStart, requestSuccess, requestError } from "./slice";
import handleError from "../errors";
import ErrorCodes from "../errors/errorCodes";
import ClientError from "../errors/clientError";
import { Journey } from "../journey/types";

export function* getTimeTableEffectSaga(action: PayloadAction<Journey>) {
  try {
    const { network, line, departure, missions } = action.payload;
    const result = yield call(getTimeTablePromise, {
      network,
      line,
      departure,
      missions,
    });

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
