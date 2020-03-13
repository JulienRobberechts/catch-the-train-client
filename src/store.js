import { configureStore } from "@reduxjs/toolkit";
import timeTableReducer from "./domains/timeTable/slice";
import toTheStationReducer from "./domains/toTheStation/slice";

export default configureStore({
  reducer: {
    timeTable: timeTableReducer,
    toTheStation: toTheStationReducer
  }
});
