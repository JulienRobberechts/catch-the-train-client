import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";

const SettingsPage = () => {
  return (
    <>
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      <Title>Paramètres</Title>
    </>
  );
};

const Title = styled.div`
  color: ${() => colors.dark.text.normal};
`;

export default SettingsPage;
