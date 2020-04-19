import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import stations from "../../data/ratp/rers/A/stations.json";
import { Header, Icon } from "semantic-ui-react";
import { AppButton, ButtonContainerOne } from "../design-system/controls";
import { DropdownField, DropdownFieldStyle } from "../design-system/controls";
import { SwitchIcon } from "../../design/icons";
import { Form, useFormikContext } from "formik";
const alphabeticalOrder = (a, b) => a.name.localeCompare(b.name);

const stationToOption = (station) => ({
  label: station?.name,
  value: station?.slug,
});

const stationOptions = stations.sort(alphabeticalOrder).map(stationToOption);

const JourneySelectionForm = ({ onSwitchStationValues }) => {
  const formContext = useFormikContext();
  const { values, isValid } = formContext;
  return (
    <StyledForm>
      <FormInnerLayout>
        <Section>
          <SectionTitle>Ligne</SectionTitle>
          <SectionContent>
            <SectionSummary>
              RER A<Note>(seule ligne pour l'instant disponible)</Note>
            </SectionSummary>
          </SectionContent>
        </Section>
        <SectionTitle>Départ</SectionTitle>
        <SectionContent>
          <FieldContainer>
            <DropdownField
              name="departure"
              label="Départ"
              placeholder={<div>Sélectionnez une gare de depart</div>}
              noOptionsMessage={() => <div>aucune gare correspondante</div>}
              autoFocus={true}
              isClearable
              menuPlacement="bottom"
              options={stationOptions}
              styles={DropdownFieldStyle(170)}
            />
          </FieldContainer>
        </SectionContent>
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
            <SectionContent>
              <FieldContainer>
                <DropdownField
                  name="destination"
                  label="Départ"
                  placeholder={<div>Sélectionnez une gare de destination</div>}
                  noOptionsMessage={() => <div>aucune gare correspondante</div>}
                  autoFocus={false}
                  isClearable
                  menuPlacement="bottom"
                  options={stationOptions}
                  styles={DropdownFieldStyle(245)}
                />
              </FieldContainer>
            </SectionContent>
          </>
        )}
        {values?.departure?.value && values?.destination?.value && (
          <ButtonContainerOne>
            <AppButton
              type="submit"
              size="large"
              appColor={colors.dark.text.highlight}
              disabled={!isValid}
            >
              Voir les prochains départs
              <Icon name="right arrow" />
            </AppButton>
          </ButtonContainerOne>
        )}
      </FormInnerLayout>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  flex-basis: 500px;
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

const Section = styled.div`
  display: flex;
`;

const SectionTitle = styled(Header).attrs(() => ({ as: "h2" }))`
  color: ${() => colors.dark.text.original};
  font-size: 1.2rem;
  margin: 0.3rem 1rem;
`;

const SectionSummary = styled.div`
  font-weight: bold;
`;

const Note = styled.span`
  color: ${() => colors.dark.text.disabled};
  font-size: 0.8rem;
  margin: 0.4rem;
`;

const SectionContent = styled.div`
  color: ${() => colors.dark.text.highlight};
  font-size: 1rem;
  margin: 0.1rem 2rem;
`;

export default JourneySelectionForm;
