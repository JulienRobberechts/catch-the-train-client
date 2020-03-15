export const selectConfigIsValid = state => {
  return true;
  // Not sure it should be here!!
  // return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = state => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};
