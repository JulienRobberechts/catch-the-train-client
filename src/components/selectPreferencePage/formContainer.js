import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import StationPreferenceForm from "./form";

import { saveSingleStationConfiguration } from "../../adapters/stationPreferences";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setStationConfiguration } from "../../domains/station/slice";
import { selectCurrentStationConfiguration } from "../../domains/timeTableToTheStation/selectors";
import { selectCurrentJourney } from "../../domains/journey/selectors";

const validationSchema = yup.object({
  travelDuration: yup
    .number()
    .typeError("Le temps de trajet doit être un nombre de secondes")
    .required("Le temps de trajet est indispensable")
    .min(0, "Le temps de trajet doit être positif")
    .max(1800, "Le temps de trajet doit être inférieur à 30 minutes"),
  accessDuration: yup
    .number()
    .typeError("Le temps d'accès au quai doit être un nombre de secondes")
    .required("Le temps d'accès au quai est indispensable")
    .min(0, "Le temps d'accès au quai doit être positif")
    .max(300, "Le temps d'accès doit être inférieur à 5 minutes"),
});

const saveAndNavigateToNextTrain = (station, dispatch, pushMethod) => (
  data
) => {
  // todo: check when not a number
  const travelDuration = Number(data?.travelDuration);
  const accessDuration = Number(data?.accessDuration);
  const config = { travelDuration, accessDuration };
  saveSingleStationConfiguration(station, config);

  dispatch(
    setStationConfiguration({
      station,
      ...config,
    })
  );

  pushMethod("/next-train");
};

const SelectionPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const currentJourney = useSelector(selectCurrentJourney);
  const currentStationPreferences = useSelector(
    selectCurrentStationConfiguration
  );

  const station = currentJourney?.departure;

  if (!station) {
    return (
      <div>
        Select a station...
        <div>todo...</div>
      </div>
    );
  }

  const { travelDuration, accessDuration = 120 } =
    currentStationPreferences || {};
  const initialStationPreferences = { travelDuration, accessDuration };

  return (
    <>
      <Helmet>
        <title>Station</title>
      </Helmet>
      <ContentLayout>
        <StyledFormik
          initialValues={initialStationPreferences}
          onSubmit={saveAndNavigateToNextTrain(station, dispatch, push)}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnMount
        >
          {() => <StationPreferenceForm station={station} />}
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
