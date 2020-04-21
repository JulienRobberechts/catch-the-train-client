import { createSlice } from "@reduxjs/toolkit";

import { getMissions } from "./service";
import { loadJourney } from "../../adapters/journey";

export const initialState = {
  request: loadJourney(),
};

export const slice = createSlice({
  name: "journey",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setCurrentJourney: (state, action) => {
      const { network, line, departure, destination } = action.payload;
      const missions = getMissions(departure, destination).join(",");
      state.request = { network, line, departure, destination, missions };
    },
  },
});

export const { reset, setCurrentJourney } = slice.actions;

export default slice.reducer;
