import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import StationPreferenceForm from "./form";

import {
  setStationTravelDuration,
  setStationAccessDuration,
} from "../../adapters/stationPreferences";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setStationConfiguration } from "../../domains/toTheStation/slice";
import { selectStationConfiguration } from "../../domains/toTheStation/selectors";

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
  setStationTravelDuration(data?.travelDuration);
  setStationAccessDuration(data?.accessDuration);

  dispatch(
    setStationConfiguration({
      station,
      travelDurationSeconds: data?.travelDuration,
      accessDurationSeconds: data?.accessDuration,
    })
  );

  pushMethod("/next-train");
};

// const getFormInitialValues = () => {
//   const {
//     travelDuration = "600",
//     accessDuration = "120",
//   } = getStationPreferences();

//   return {
//     travelDuration,
//     accessDuration,
//   };
// };

const SelectionPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const initialStationPreferences = useSelector(selectStationConfiguration) ?? {
    travelDuration: 600,
    accessDuration: 120,
  };

  // TODO Use selector
  const station = "chatelet+les+halles";

  return (
    <>
      <Helmet>
        <title>Attraper le train</title>
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
