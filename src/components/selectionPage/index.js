import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { colors } from "../../design/colors";

const SelectionPage = () => {
  return (
    <>
      <Helmet>
        <title>Selection</title>
      </Helmet>
      <Title>Selection</Title>

      <SectionTitle>Réseau</SectionTitle>
      <Section>RER</Section>
      <SectionTitle>Ligne</SectionTitle>
      <Section>A</Section>
      <SectionTitle>Gare</SectionTitle>
      <Section>...</Section>
      <SectionTitle>Destination</SectionTitle>
      <Section>...</Section>
    </>
  );
};

const Title = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.4rem;
  margin: 1rem 1rem;
`;

const SectionTitle = styled.div`
  color: ${() => colors.dark.text.normal};
  font-size: 1.1rem;
  margin: 0.5rem 1rem;
`;

const Section = styled.div`
  color: ${() => colors.dark.text.highlight};
  font-size: 0.9rem;
  margin: 0.1rem 2rem;
`;

export default SelectionPage;
