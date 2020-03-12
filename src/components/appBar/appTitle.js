import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const AppTitle = () => {
  return (
    <Panel>
      <div>Attraper le train</div>
    </Panel>
  );
};

const Panel = styled.div`
  color: ${() => colors.dark.text.normal};
  font-weight: bold;
  padding: 0.3rem;
`;

export default AppTitle;
