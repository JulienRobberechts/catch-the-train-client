import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";
import { Formik, Form, useField } from "formik";
import stations from "../../data/ratp/rers/A/stations.json";
import { Button, Header, Dropdown } from "semantic-ui-react";
import { getMissions } from "../../domains/journey/service";
import { useHistory } from "react-router-dom";

const DropdownSemantic = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);
  const finalProps = { ...props, ...field };

  // Can be useful to act on the full formik
  // const formikContext = useFormikContext();
  // console.log("DropdownSemantic formikContext ", { formikContext });

  // console.log("DropdownSemantic helpers ", { helpers });
  // console.log("DropdownSemantic", { props });
  // console.log("DropdownSemantic", { field });
  // console.log("DropdownSemantic", { meta });
  // console.log("DropdownSemantic", { finalProps });

  return (
    <Dropdown
      {...finalProps}
      onChange={(e, data) => {
        helpers.setValue(data.value);
        const touched = data.value !== meta.initialValue;
        console.log({ touched });
        helpers.setTouched(data.value !== meta.initialValue);
      }}
    />
  );
};

const buildUrl = ({ network, line, departure, destination }) => {
  const missions = getMissions(departure, destination);
  const missionParam = missions.join(",");
  return `/${network}/${line}/${departure}?missions=${missionParam}`;
};

const SelectionPage = () => {
  const stationOptions = stations.map((station) => ({
    key: station.slug,
    value: station.slug,
    text: station.name,
  }));

  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <Title>Selection</Title>
      <Formik
        initialValues={{
          departure: "chatelet+les+halles",
          destination: "gare+de+lyon",
        }}
        onSubmit={(data) => {
          const url = buildUrl({
            network: "rers",
            line: "A",
            departure: data.departure,
            destination: data.destination,
          });
          console.log({ url });
          history.push(url);
        }}
      >
        {(formik) => (
          <Form>
            <SectionTitle>Réseau</SectionTitle>
            <Section>RER</Section>
            <SectionTitle>Ligne</SectionTitle>
            <Section>A</Section>
            <SectionTitle>Au départ de</SectionTitle>
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
            <SectionTitle>Á destination de</SectionTitle>
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
  display: flex;
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
