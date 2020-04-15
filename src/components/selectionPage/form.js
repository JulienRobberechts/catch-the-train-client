import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import stations from "../../data/ratp/rers/A/stations.json";
import { Button, Header, Icon } from "semantic-ui-react";
import DropdownReactSelectField from "./dropdown-reactSelect";
import { selectStyles } from "./dropdown-reactSelect.style";
import { SwitchIcon } from "../../design/icons";
import { Form, useFormikContext } from "formik";

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

const JourneySelectionForm = ({ onSwitchStationValues }) => {
  const formContext = useFormikContext();
  console.log({ formContext });
  const { values, isValid } = formContext;
  return (
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
              noOptionsMessage={() => <div>aucune gare correspondante</div>}
              autoFocus={true}
              isClearable
              menuPlacement="bottom"
              options={stationOptions}
              styles={selectStyles(300)}
            />
          </FieldContainer>
        </Section>
        {values?.departure?.value && (
          <>
            <FlexContainer>
              <SectionTitle>Destination</SectionTitle>
              <IconContainer
                className="ui circular icon"
                onClick={onSwitchStationValues}
              >
                <SwitchIcon />
              </IconContainer>
            </FlexContainer>
            <Section>
              <FieldContainer>
                <DropdownReactSelectField
                  name="destination"
                  label="Départ"
                  placeholder={<div>Sélectionnez une gare de destination</div>}
                  noOptionsMessage={() => <div>aucune gare correspondante</div>}
                  autoFocus={false}
                  isClearable
                  menuPlacement="bottom"
                  options={stationOptions}
                  styles={selectStyles(400)}
                />
              </FieldContainer>
            </Section>
          </>
        )}
        {values?.departure?.value && values?.destination?.value && (
          <>
            <SubmitButtonContainer>
              <SubmitButton
                type="submit"
                size="large"
                inverted
                color="orange"
                disabled={!isValid}
              >
                Voir les prochains départs
                <Icon name="right arrow" />
              </SubmitButton>
            </SubmitButtonContainer>
          </>
        )}
      </FormInnerLayout>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  flex-basis: 500px;
  // background-color: yellow;
`;

const FormInnerLayout = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const FlexContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  margin: 0.2rem 2rem;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: ${() => colors.dark.text.original};
  }
`;

const FieldContainer = styled.div`
  justify-content: center;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2 rem;
  margin: 1rem 2rem;
  // background-color: green;
`;

const SubmitButton = styled(Button)`
  flex-grow: 1;
  &.ui.button {
    margin: 0;
  }

  &.ui.inverted.orange.button:hover {
    background-color: #e0ab19;
  }
  &.ui.inverted.orange.button.active,
  &.ui.inverted.orange.button:active,
  &.ui.inverted.orange.button:focus,
  &.ui.inverted.orange.button:hover,
  &.ui.inverted.orange.buttons .button.active,
  &.ui.inverted.orange.buttons .button:active,
  &.ui.inverted.orange.buttons .button:focus,
  &.ui.inverted.orange.buttons .button:hover {
    box-shadow: none !important;
    color: #252149;
  }
  &.ui.inverted.orange.button {
    background-color: transparent;
    box-shadow: 0 0 0 2px #e0ab19 inset !important;
    color: #e0ab19;
  }
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

export default JourneySelectionForm;