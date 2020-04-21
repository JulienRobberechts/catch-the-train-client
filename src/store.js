import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import timeTableReducer from "./domains/timeTable/slice";
import toTheStationReducer from "./domains/toTheStation/slice";
import rootSaga from "./sagas";
import { getJourney } from "./adapters/journey";
import { getStationConfigurations } from "./adapters/stationPreferences";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const preloadedState = {
  timeTable: {
    request: getJourney(),
  },
  toTheStation: {
    stationConfigurations: getStationConfigurations(),
  },
};

const reducer = {
  timeTable: timeTableReducer,
  toTheStation: toTheStationReducer,
};

export default configureStore({
  reducer,
  middleware,
  preloadedState,
});

sagaMiddleware.run(rootSaga);
