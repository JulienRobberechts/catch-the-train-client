import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { getMissions } from "../../domains/journey/service";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { useSelector } from "react-redux";
import { selectTimeTableRequest } from "../../domains/timeTable/selectors";
import { getStationBySlug } from "../../domains/journey/service";

const buildUrl = ({ network, line, departure, destination }) => {
  const missions = getMissions(departure, destination);
  const missionParam = missions.join(",");
  return `/${network}/${line}/${departure}?missions=${missionParam}`;
};

const initialValues = {
  departure: null,
  destination: {
    label: "Chatelet-Les-Halles",
    value: "chatelet+les+halles",
  },
};

const getUrl = (data) => {
  return buildUrl({
    network: "rers",
    line: "A",
    departure: data.departure.value,
    destination: data.destination.value,
  });
};

const saveAndRedirectToNextTrain = (pushMethod) => (data) => {
  localStorage.setItem("preferred-network", "rers");
  localStorage.setItem("preferred-line", "A");
  localStorage.setItem("preferred-departure-station", data?.departure.value);
  localStorage.setItem(
    "preferred-destination-station",
    data?.destination.value
  );

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
  color: "#0052CC",
  target: {
    value: station?.slug,
  },
});

const SelectionPage = () => {
  const { push } = useHistory();
  const request = useSelector(selectTimeTableRequest);
  const [initialValuesDynamic, setInitialValuesDynamic] = useState(
    initialValues
  );

  // Get the departure station from localStorage
  useEffect(() => {
    const departureValue = localStorage.getItem("preferred-departure-station");
    const destinationValue = localStorage.getItem(
      "preferred-destination-station"
    );
    console.log("from local storage", { departureValue, destinationValue });

    const departureOption = stationToOption(getStationBySlug(departureValue));
    const destinationOption = stationToOption(
      getStationBySlug(destinationValue)
    );
    if (
      departureValue !== initialValuesDynamic?.departure?.value ||
      destinationValue !== initialValuesDynamic?.destination?.value
    ) {
      console.log("CHANGE");
      setInitialValuesDynamic({
        departure: departureOption,
        destination: destinationOption,
      });
    }
  }, [initialValuesDynamic, setInitialValuesDynamic]);

  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <ContentLayout>
        <StyledFormik
          initialValues={initialValuesDynamic}
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
