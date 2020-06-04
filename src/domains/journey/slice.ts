import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loadJourney } from "../../adapters/journey";
import { FullJourney } from "./types";

export const initialState: FullJourney = {
  ...loadJourney(),
};

export const slice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setCurrentJourney: (state, action: PayloadAction<FullJourney>) => {
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
