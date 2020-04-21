import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { getStationBySlug } from "../../domains/journey/service";
import { setJourney } from "../../adapters/journey";
import { setRequest } from "../../domains/timeTable/slice";
import { selectTimeTableRequest } from "../../domains/timeTable/selectors";

const saveAndNavigate = (dispatch, pushMethod) => (data) => {
  const journey = {
    network: "rers",
    line: "A",
    departure: data?.departure.value,
    destination: data?.destination.value,
  };
  dispatch(setRequest(journey));
  setJourney(journey);
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
  label: station?.name,
  value: station?.slug,
});

const requestToOptions = (request) => {
  const { departure: departureValue, destination: destinationValue } = request;

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

  const request = useSelector(selectTimeTableRequest);
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
          initialValues={requestToOptions(request)}
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
