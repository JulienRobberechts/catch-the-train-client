import React from "react";
import styled from "styled-components";
import { colors } from "../../design/colors";

const Title = () => {
  return (
    <Panel>
      <div>Attraper le train</div>
    </Panel>
  );
};

const Panel = styled.div`
  background-color: ${() => colors.color1};
  color: ${() => colors.color6};
  font-weight: bold;
  padding: 0.3rem;
`;

export default Title;
