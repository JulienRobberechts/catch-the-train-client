import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Button } from "semantic-ui-react";

import { FixedAppTitleHeightRem } from "../appBar/appTitle";
import { setStationConfiguration } from "../../domains/station/slice";
import { selectCurrentStationConfiguration } from "../../domains/timeTableToTheStation/selectors";
import { getStationBySlug } from "../../domains/journey/service";
import { selectCurrentJourney } from "../../domains/journey/selectors";
import ResizeContainer from "./ResizeContainer";

const saveAndNavigate = (
  station: string,
  dispatch: Dispatch<any>,
  pushMethod: (path: string) => void,
  travelDurationSeconds: number
) => () => {
  dispatch(
    setStationConfiguration({
      station,
      travelDurationSeconds: travelDurationSeconds,
    })
  );

  pushMethod("/preferences");
};

const SelectDurationPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const stationConfiguration = useSelector(selectCurrentStationConfiguration);
  const initialTravelDurationSeconds =
    stationConfiguration?.travelDurationSeconds || 600;

  const currentJourney = useSelector(selectCurrentJourney);
  const departureName = getStationBySlug(currentJourney?.departure)?.name;

  return (
    <>
      <Helmet>
        <title>Trajet</title>
      </Helmet>
      <ContentLayout>
        <div>
          <div>gare de {departureName}</div>
          <Button
            onClick={saveAndNavigate(
              "auber",
              dispatch,
              push,
              initialTravelDurationSeconds
            )}
          >
            Valider
          </Button>
          <ResizeContainer onValidation={() => console.log("onValidation")} />
        </div>
      </ContentLayout>
    </>
  );
};

const ContentLayout = styled.div`
  min-height: calc(100vh - ${FixedAppTitleHeightRem}rem);
  display: flex;
  justify-content: center;
`;

export default SelectDurationPage;
