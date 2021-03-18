import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Formik, FormikProps } from "formik";
import { useHistory } from "react-router-dom";
import JourneySelectionForm from "./form";
import { getStationBySlug } from "../../domains/journey/service";
import { saveJourney } from "../../adapters/journey";
import { setCurrentJourney } from "../../domains/journey/slice";
import { selectCurrentJourney } from "../../domains/journey/selectors";
import { StationDefinition } from "../../data/ratp/rers/A/types";
import { FullJourney } from "../../domains/journey/types";

export interface ReactSelectOption {
  label: string;
  value: string;
}

export interface JourneyFormikValues {
  departure?: ReactSelectOption;
  destination?: ReactSelectOption;
}

const saveAndNavigate = (
  dispatch: Dispatch<any>,
  pushMethod: (path: string) => void
) => (data: JourneyFormikValues) => {
  const departure = data?.departure?.value!;
  const destination = data?.destination?.value!;
  const journey: FullJourney = {
    network: "rers",
    line: "A",
    departure,
    destination,
  };

  dispatch(setCurrentJourney(journey));
  saveJourney(journey);
  pushMethod("/select-travel-duration");
};

const onSwitchStationValues = (
  formik: FormikProps<JourneyFormikValues>
) => () => {
  const previousDeparture = formik.values.departure;
  const previousDestination = formik.values.destination;
  formik.setFieldValue("departure", previousDestination);
  formik.setFieldValue("destination", previousDeparture);
};

const stationToOption = (station: StationDefinition) => ({
  label: station?.name,
  value: station?.slug,
});

const journeyToOptions = (
  journey: FullJourney | undefined
): JourneyFormikValues => {
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
    : undefined;

  const destinationStation = getStationBySlug(destinationValue);
  const destinationOption = destinationStation
    ? stationToOption(destinationStation)
    : undefined;

  return {
    departure: departureOption,
    destination: destinationOption,
  };
};

const SelectionPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const initialJourney = useSelector(selectCurrentJourney);
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
