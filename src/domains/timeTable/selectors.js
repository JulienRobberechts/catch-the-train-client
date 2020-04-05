export const selectRequestStatus = (state) => {
  return {
    loading: !!state?.timeTable?.loading,
    error: state?.timeTable?.error,
    hasData: !!state?.timeTable?.data,
  };
};

export const selectTimeTableContext = (state) => {
  return state?.timeTable?.data?.context;
};

export const selectAllDepartures = (state) => {
  return state?.timeTable?.data?.departures;
};
