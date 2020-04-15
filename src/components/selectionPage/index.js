import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";
import { Formik, Form } from "formik";
import stations from "../../data/ratp/rers/A/stations.json";
import { Button, Header } from "semantic-ui-react";
import { getMissions } from "../../domains/journey/service";
import { useHistory } from "react-router-dom";
import DropdownReactSelectField from "./dropdown-reactSelect";
import { selectStyles } from "./dropdown-reactSelect.style";
import { SwitchIcon } from "../../design/icons";

const buildUrl = ({ network, line, departure, destination }) => {
  const missions = getMissions(departure, destination);
  console.log({ missions });
  const missionParam = missions.join(",");
  return `/${network}/${line}/${departure}?missions=${missionParam}`;
};

const stationOptions = stations.map((station) => ({
  key: station.slug,
  label: station.name, // React-select
  value: station.slug, // React-select
  text: station.name,
  color: "#0052CC",
  target: {
    value: station.slug,
  },
}));

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

const redirectToNextTrain = (pushMethod) => (data) => {
  const url = getUrl(data);
  console.log({ url });
  pushMethod(url);
};

const SelectionPage = () => {
  const { push } = useHistory();
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <Title>Choix du train</Title>
      <ContentLayout>
        <StyledFormik
          initialValues={initialValues}
          onSubmit={redirectToNextTrain(push)}
        >
          {(formik) => (
            <StyledForm>
              <FormInnerLayout>
                <SectionTitle>Ligne</SectionTitle>
                <Section>RER A</Section>
                <SectionTitle>Départ</SectionTitle>
                <Section>
                  <FieldContainer>
                    <DropdownReactSelectField
                      name="departure"
                      label="Départ"
                      placeholder={<div>Sélectionnez une gare de depart</div>}
                      noOptionsMessage={() => (
                        <div>aucune gare correspondante</div>
                      )}
                      autoFocus={true}
                      isClearable
                      menuPlacement="bottom"
                      options={stationOptions}
                      styles={selectStyles(300)}
                    />
                  </FieldContainer>
                </Section>
                <Section>
                  <FieldContainer></FieldContainer>
                </Section>
                <FlexContainer>
                  <SectionTitle>Destination</SectionTitle>
                  <IconContainer
                    className="ui circular icon"
                    onClick={() => {
                      const previousDeparture = formik.values.departure;
                      const previousDestination = formik.values.destination;
                      formik.setFieldValue("departure", previousDestination);
                      formik.setFieldValue("destination", previousDeparture);
                      // formik.values.departure = previousDestination;
                      // formik.values.destination = previousDeparture;
                      console.log("Switch");
                    }}
                  >
                    <SwitchIcon />
                  </IconContainer>
                </FlexContainer>
                <Section>
                  <FieldContainer>
                    <DropdownReactSelectField
                      name="destination"
                      label="Départ"
                      placeholder={
                        <div>Sélectionnez une gare de destination</div>
                      }
                      noOptionsMessage={() => (
                        <div>aucune gare correspondante</div>
                      )}
                      autoFocus={false}
                      isClearable
                      menuPlacement="bottom"
                      options={stationOptions}
                      styles={selectStyles(400)}
                    />
                  </FieldContainer>
                </Section>
                <SubmitButtonContainer>
                  <Button type="submit">Voir les prochains départs</Button>
                </SubmitButtonContainer>
              </FormInnerLayout>
            </StyledForm>
          )}
        </StyledFormik>
      </ContentLayout>
    </>
  );
};

const ContentLayout = styled.div`
  display: flex;
  justify-content: center;
  // background-color: red;
`;

const StyledFormik = styled(Formik)`
  flex-shrink: 3;
`;

const StyledForm = styled(Form)`
  flex-basis: 500px;
  // background-color: yellow;
`;

const FormInnerLayout = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  margin: 0.2rem 2rem;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.highlight};
  }
`;

const FieldContainer = styled.div`
  justify-content: center;
  max-width: 500px;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 500px;
  padding: 1rem;
`;

const Title = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.4rem;
  margin: 1rem 1rem;
`;

const SectionTitle = styled(Header).attrs(() => ({ as: "h2" }))`
  color: ${() => colors.dark.text.original};
  font-size: 1.1rem;
  margin: 0.5rem 1rem;
`;

const Section = styled.div`
  color: ${() => colors.dark.text.highlight};
  font-size: 0.9rem;
  margin: 0.1rem 2rem;
`;

export default SelectionPage;
