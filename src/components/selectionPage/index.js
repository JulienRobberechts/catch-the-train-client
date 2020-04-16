import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { getMissions } from "../../domains/journey/service";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { getStationBySlug } from "../../domains/journey/service";

const buildUrl = ({ network, line, departure, destination }) => {
  const missions = getMissions(departure, destination);
  const missionParam = missions.join(",");
  return `/${network}/${line}/${departure}?missions=${missionParam}`;
};

const getUrl = (data) => {
  return buildUrl({
    network: "rers",
    line: "A",
    departure: data.departure.value,
    destination: data.destination.value,
  });
};

const saveJourney = (data) => {
  localStorage.setItem("preferred-network", "rers");
  localStorage.setItem("preferred-line", "A");
  localStorage.setItem("preferred-departure-station", data?.departure.value);
  localStorage.setItem(
    "preferred-destination-station",
    data?.destination.value
  );
};

const saveAndRedirectToNextTrain = (pushMethod) => (data) => {
  saveJourney(data);
  const url = getUrl(data);
  pushMethod(url);
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

const getPreferredJourney = () => {
  const departureValue = localStorage.getItem("preferred-departure-station");
  const destinationValue = localStorage.getItem(
    "preferred-destination-station"
  );
  console.log("from local storage", { departureValue, destinationValue });

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
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <ContentLayout>
        <StyledFormik
          initialValues={getPreferredJourney()}
          onSubmit={saveAndRedirectToNextTrain(push)}
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
