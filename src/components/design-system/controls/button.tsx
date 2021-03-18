
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { colors } from "../../../design/colors";

const AppButton = ({ appColor = colors.dark.text.original, ...props }) => {
  return (
    <StyledSemanticButton
      inverted
      appcolor={appColor}
      color="orange"
      {...props}
    />
  );
};

const StyledSemanticButton = styled(Button)`
  flex-grow: 1;

  &.ui.button {
    margin: 0;
  }

  &.ui.inverted.orange.button {
    margin: 0.5rem 0;
  }

  &.ui.inverted.orange.button + &.ui.inverted.orange.button {
    margin-left: 1.5rem;
  }

  &.ui.inverted.orange.button.active,
  &.ui.inverted.orange.button:active,
  &.ui.inverted.orange.button:focus,
  &.ui.inverted.orange.button:hover,
  &.ui.inverted.orange.buttons .button.active,
  &.ui.inverted.orange.buttons .button:active,
  &.ui.inverted.orange.buttons .button:focus,
  &.ui.inverted.orange.buttons .button:hover {
    color: ${() => colors.dark.background};
    background-color: ${(props) => props.appcolor};
    box-shadow: none !important;
  }
  &.ui.inverted.orange.button {
    background-color: transparent;
    box-shadow: 0 0 0 2px ${(props) => props.appcolor} inset !important;
    color: ${(props) => props.appcolor};
  }
`;

const ButtonContainerOne = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2 rem;
  margin: 1rem 2rem;
`;

const ButtonContainerTwo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 1rem;
`;

export { AppButton as default, ButtonContainerOne, ButtonContainerTwo };
