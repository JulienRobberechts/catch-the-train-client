import { createSlice } from "@reduxjs/toolkit";

import { loadJourney } from "../../adapters/journey";
import { ReduxStateJourney } from "./types";

export const initialState: ReduxStateJourney = {
  ...loadJourney(),
};

export const slice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setCurrentJourney: (state, action) => {
      const {
        network,
        line,
        departure,
        destination,
        missions,
      } = action.payload;
      state.network = network;
      state.line = line;
      state.departure = departure;
      state.destination = destination;
      state.missions = missions;
    },
  },
});

export const { reset, setCurrentJourney } = slice.actions;

export default slice.reducer;