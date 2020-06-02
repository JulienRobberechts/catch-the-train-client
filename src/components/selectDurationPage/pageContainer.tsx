import React, { Dispatch } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { FixedAppTitleHeightRem } from "../appBar/appTitle";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { setStationConfiguration } from "../../domains/station/slice";
import { useDispatch } from "react-redux";

const saveAndNavigate = (
  station: string,
  dispatch: Dispatch<any>,
  pushMethod: (path: string) => void
) => () => {
  dispatch(
    setStationConfiguration({
      station,
      travelDurationSeconds: 456,
    })
  );

  pushMethod("/preferences");
};

const SelectDurationPage = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Trajet</title>
      </Helmet>
      <ContentLayout>
        <div>
          <Button onClick={saveAndNavigate("auber", dispatch, push)}>
            Next
          </Button>
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
