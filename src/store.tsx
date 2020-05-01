import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import journeyReducer from "./domains/journey/slice";
import stationReducer from "./domains/station/slice";
import timeTableReducer from "./domains/timeTable/slice";
import toTheStationReducer from "./domains/toTheStation/slice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const reducer = {
  journey: journeyReducer,
  station: stationReducer,
  timeTable: timeTableReducer,
  toTheStation: toTheStationReducer,
};

export default configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSaga);
