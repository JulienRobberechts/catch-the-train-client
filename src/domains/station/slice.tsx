import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadStationConfigurations } from "../../adapters/stationPreferences";
import { PayloadStationConfiguration } from "./types";
import { ReduxStateStation } from "./types";

export const initialState: ReduxStateStation = {
  userConfiguration: {
    onTimeMarginDelaySeconds: 50,
    timezone: "+01:00",
  },
  stationConfigurations: loadStationConfigurations(),
};

export const slice = createSlice({
  name: "toTheStation",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    setUserConfiguration: (state, action) => {
      state.userConfiguration = action.payload;
    },
    setStationConfiguration: (
      state,
      action: PayloadAction<PayloadStationConfiguration>
    ) => {
      const { station, ...props } = action.payload || {};
      if (station) {
        state.stationConfigurations[station] = { ...props };
      }
    },
  },
});

export const {
  reset,
  setStationConfiguration,
  setUserConfiguration,
} = slice.actions;

export default slice.reducer;
