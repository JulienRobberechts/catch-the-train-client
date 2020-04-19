import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Form as SemanticForm, Header, Icon } from "semantic-ui-react";
import { AppButton, ButtonContainerOne } from "../design-system/controls";
import { InputField } from "../design-system/controls";
import { Form, useFormikContext } from "formik";
import { getStationBySlug } from "../../domains/journey/service";
import { TimeSpan } from "../time";
import moment from "moment";

const StationPreferenceForm = ({ station }) => {
  const formContext = useFormikContext();
  const { values, isValid } = formContext;
  const stationName = getStationBySlug(station)?.name;
  return (
    <StyledForm>
      <SemanticForm>
        <FormInnerLayout>
          <Title>
            <TitleNormal>Gare de</TitleNormal>{" "}
            <TitleImportant>'{stationName}'</TitleImportant>
          </Title>
          <SectionTitle>
            Temps de trajet pour se rendre à la gare (en secondes)
          </SectionTitle>
          <SectionContent>
            <FieldContainer>
              <InputField
                name="travelDuration"
                type="number"
                size="small"
                placeholder="600"
              />
            </FieldContainer>
            <Note>
              Soit{" "}
              <HighlightText>
                <TimeSpan
                  timeSpan={moment.duration({
                    seconds: values.travelDuration,
                  })}
                  displaySeconds
                />
              </HighlightText>{" "}
              pour aller de votre lieu actuel (maisons, bureau) à votre entrée
              habituelle de la gare.
            </Note>
          </SectionContent>
          <SectionTitle>
            Temps dans la gare pour atteindre le quai (en secondes)
          </SectionTitle>
          <SectionContent>
            <FieldContainer>
              <InputField
                name="accessDuration"
                type="number"
                placeholder="120"
              />
            </FieldContainer>
            <Note>
              Soit{" "}
              <HighlightText>
                <TimeSpan
                  timeSpan={moment.duration({
                    seconds: values.accessDuration,
                  })}
                  displaySeconds
                />
              </HighlightText>{" "}
              pour aller de l'entrée de la gare jusqu'au quai.
            </Note>
          </SectionContent>
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
        </FormInnerLayout>
      </SemanticForm>
    </StyledForm>
  );
};

const HighlightText = styled.span`
  color: ${() => colors.dark.text.highlight};
`;

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

const FieldContainer = styled.div`
  justify-content: center;
`;

const Title = styled(Header).attrs(() => ({ as: "h1" }))`
  color: ${() => colors.dark.text.highlight};
  font-size: 1.4rem;
  margin: 0.3rem 1rem;
`;
const TitleNormal = styled.span`
  color: ${() => colors.dark.text.disabled};
  font-size: 1.4rem;
`;
const TitleImportant = styled.span`
  color: ${() => colors.dark.text.highlight};
  font-size: 1.4rem;
  text-transform: uppercase;
`;

const SectionTitle = styled(Header).attrs(() => ({ as: "h2" }))`
  color: ${() => colors.dark.text.original};
  font-size: 1.2rem;
  margin: 0.3rem 1rem;
`;

const Note = styled.span`
  color: ${() => colors.dark.text.disabled};
  font-size: 0.9rem;
`;

const SectionContent = styled.div`
  color: ${() => colors.dark.text.highlight};
  font-size: 1rem;
  margin: 0.1rem 2rem;
`;

export default StationPreferenceForm;
