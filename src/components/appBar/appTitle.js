import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";
import { Helmet } from "react-helmet";

const AppTitle = () => {
  return (
    <>
      <Helmet>
        <title>Attraper le train</title>
      </Helmet>
      <Panel>
        <div>Attraper le train</div>
      </Panel>
    </>
  );
};

const Panel = styled.div`
  color: ${() => colors.dark.text.normal};
  font-weight: bold;
  padding: 0.3rem;
`;

export default AppTitle;
