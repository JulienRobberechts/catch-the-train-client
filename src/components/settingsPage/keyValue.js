import React from "react";
import styled from "styled-components";

import { colors } from "../../design/colors";

const KeyValue = ({ keyName, value }) => (
  <KeyValueDiv>
    <Key>{keyName}</Key>
    <EqualSign>:</EqualSign>
    <Value>{value}</Value>
  </KeyValueDiv>
);

const KeyValueDiv = styled.div``;

const Key = styled.span`
  color: ${() => colors.dark.text.disabled};
`;

const EqualSign = styled.span`
  color: ${() => colors.dark.text.disabled};
  margin-right: 0.6rem;
`;

const Value = styled.span``;

export default KeyValue;
