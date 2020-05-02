import { all } from "redux-saga/effects";
import { timeTableSagas } from "./domains/timeTable/sagas";

export default function* rootSaga() {
  yield all([timeTableSagas()]);
}
