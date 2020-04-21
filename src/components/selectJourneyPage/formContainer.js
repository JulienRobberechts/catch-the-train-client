import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { getStationBySlug } from "../../domains/journey/service";
import { saveJourney } from "../../adapters/journey";
import { setRequest } from "../../domains/journey/slice";
import { selectTimeTableRequest } from "../../domains/journey/selectors";

const saveAndNavigate = (dispatch, pushMethod) => (data) => {
  const journey = {
    network: "rers",
    line: "A",
    departure: data?.departure.value,
    destination: data?.destination.value,
  };
  dispatch(setRequest(journey));
  saveJourney(journey);
  pushMethod("/preferences");
};

const onSwitchStationValues = (formik) => () => {
  const previousDeparture = formik.values.departure;
  const previousDestination = formik.values.destination;
  formik.setFieldValue("departure", previousDestination);
  formik.setFieldValue("destination", previousDeparture);
};

const stationToOption = (station) => ({
  label: station?.name,
  value: station?.slug,
});

const journeyToOptions = (journey) => {
  if (!journey) {
    return {
      departure: undefined,
      destination: undefined,
    };
  }
  const { departure: departureValue, destination: destinationValue } = journey;

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
  const initialJourney = useSelector(selectTimeTableRequest);
  return (
    <>
      <Helmet>
        <title>Trajet</title>
      </Helmet>
      <ContentLayout>
        <StyledFormik
          initialValues={journeyToOptions(initialJourney)}
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
