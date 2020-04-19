import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { getStationBySlug } from "../../domains/journey/service";
import { getJourney, setJourney } from "../../adapters/journey";
import { setRequest } from "../../domains/timeTable/slice";

// import { getMissions } from "../../domains/journey/service";
// const buildUrl = ({ network, line, departure, destination }) => {
//   const missions = getMissions(departure, destination);
//   const missionParam = missions.join(",");
//   return `/${network}/${line}/${departure}?missions=${missionParam}`;
// };

// const getUrl = (data) => {
//   return buildUrl({
//     network: "rers",
//     line: "A",
//     departure: data.departure.value,
//     destination: data.destination.value,
//   });
// };

const saveAndNavigate = (dispatch, pushMethod) => (data) => {
  const journey = {
    network: "rers",
    line: "A",
    departure: data?.departure.value,
    destination: data?.destination.value,
  };
  setJourney(journey);
  dispatch(setRequest(journey));
  pushMethod("/preferences");
};

const onSwitchStationValues = (formik) => () => {
  console.log("formik.values", formik.values);
  const previousDeparture = formik.values.departure;
  const previousDestination = formik.values.destination;
  formik.setFieldValue("departure", previousDestination);
  formik.setFieldValue("destination", previousDeparture);
};

const stationToOption = (station) => ({
  key: station?.slug,
  label: station?.name, // React-select
  value: station?.slug, // React-select
  text: station?.name,
  target: {
    value: station?.slug,
  },
});

const getInitialJourney = () => {
  const {
    departure: departureValue,
    destination: destinationValue,
  } = getJourney();

  const departureStation = getStationBySlug(departureValue);
  const departureOption = departureStation
    ? stationToOption(departureStation)
    : null;

  const destinationStation = getStationBySlug(destinationValue);
  const destinationOption = destinationStation
    ? stationToOption(destinationStation)
    : null;

  return {
    departure: departureOption,
    destination: destinationOption,
  };
};

const SelectionPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch()
  // }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <ContentLayout>
        <StyledFormik
          initialValues={getInitialJourney()}
          onSubmit={saveAndNavigate(dispatch, push)}
          enableReinitialize
        >
          {(formik) => (
            <JourneySelectionForm
              onSwitchStationValues={onSwitchStationValues(formik)}
            />
          )}
        </StyledFormik>
      </ContentLayout>
    </>
  );
};

const ContentLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFormik = styled(Formik)`
  flex-shrink: 3;
`;

export default SelectionPage;
