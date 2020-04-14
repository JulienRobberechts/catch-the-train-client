import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";
import { Formik, Form } from "formik";
import stations from "../../data/ratp/rers/A/stations.json";
import { Button, Header } from "semantic-ui-react";
import { getMissions } from "../../domains/journey/service";
import { useHistory } from "react-router-dom";
import DropdownSemantic from "./dropdownSemantic";
import DropdownReactSelectField from "./dropdown-reactSelect";
import { selectStyles } from "./dropdown-reactSelect.style";

const buildUrl = ({ network, line, departure, destination }) => {
  const missions = getMissions(departure, destination);
  const missionParam = missions.join(",");
  return `/${network}/${line}/${departure}?missions=${missionParam}`;
};

const stationOptions = stations.map((station) => ({
  key: station.slug,
  label: station.name, //
  value: station.slug, // React-select
  text: station.name,
  color: "#0052CC",
  target: {
    value: station.slug,
  },
}));

const SelectionPage = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <Title>Choix du train</Title>
      <Formik
        initialValues={{
          departure: "chatelet+les+halles",
          destination: "gare+de+lyon",
        }}
        onSubmit={(data) => {
          const url = buildUrl({
            network: "rers",
            line: "A",
            departure: data.departure.value,
            destination: data.destination,
          });
          console.log({ url });
          history.push(url);
        }}
      >
        {(formik) => (
          <Form>
            <SectionTitle>Ligne</SectionTitle>
            <Section>RER A</Section>
            <SectionTitle>Départ</SectionTitle>
            <Section>
              <FieldContainer>
                <DropdownSemantic
                  name="departure"
                  type="select"
                  placeholder="Gare de départ"
                  fluid
                  search
                  selection
                  clearable
                  options={stationOptions}
                />
              </FieldContainer>
            </Section>
            <Section>
              <FieldContainer>
                <DropdownReactSelectField
                  name="departure"
                  label="Départ"
                  placeholder={<div>Sélectionnez une gare de depart</div>}
                  noOptionsMessage={() => <div>aucune gare correspondante</div>}
                  autoFocus
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
            <SectionTitle>Destination</SectionTitle>
            <Section>
              <FieldContainer>
                <DropdownSemantic
                  name="destination"
                  type="select"
                  placeholder="Gare de destination"
                  fluid
                  search
                  selection
                  clearable
                  options={stationOptions}
                />
              </FieldContainer>
            </Section>
            <SubmitButtonContainer>
              <Button type="submit">Voir les prochains départs</Button>
            </SubmitButtonContainer>
            <h1>Formik</h1>
            <pre>{JSON.stringify(formik, null, 3)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};

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
