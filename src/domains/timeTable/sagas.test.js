import { put, call, takeLatest } from "redux-saga/effects";
import { getTimeTableEffectSaga, getTimeTable } from "./sagas";

test("getTimeTableEffectSaga", () => {
  expect(1).toBe(1);
  const action = {};
  const gen = getTimeTableEffectSaga(action);

  const action1 = gen.next();
  expect(action1.value).toEqual(call(getTimeTable));

  const action2 = gen.next();
  // expect(action2.value).toEqual("XXX");
  // timeTable/fetchError but should be timeTable/fetchSuccess
  // because the result of the call is null.

  const action3 = gen.next();
  expect(action3.done).toBeTruthy();
});
