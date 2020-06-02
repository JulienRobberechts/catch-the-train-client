import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { FixedAppTitleHeightRem } from "../appBar/appTitle";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const saveAndNavigate = (pushMethod: (path: string) => void) => () => {
  pushMethod("/preferences");
};

const SelectDurationPage = () => {
  const { push } = useHistory();

  return (
    <>
      <Helmet>
        <title>Trajet</title>
      </Helmet>
      <ContentLayout>
        <div>
          <Button onClick={saveAndNavigate(push)}>Next</Button>
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
