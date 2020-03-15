export const selectConfigIsValid = state => {
  return true;
  // return !!state?.timeTable.route?.station?.code;
};

export const selectStationCode = state => {
  return state?.timeTable.route?.station?.code;
};

export const selectRoute = state => {
  return state?.timeTable?.route;
};
