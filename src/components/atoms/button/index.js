import styled from "styled-components/macro";

import {
  primaryButton,
  secondaryButton,
  fadeButton,
  extraButton,
  linkButton,
  actionButton,
} from "styles/global_blocks";

const Button = styled.button`
  ${({ kind }) => {
    if (kind === "secondary") return secondaryButton;
    if (kind === "fade") return fadeButton;
    if (kind === "extra") return extraButton;
    if (kind === "link") return linkButton;
    if (kind === "action") return actionButton;
    return primaryButton;
  }}
`;

export default Button;
