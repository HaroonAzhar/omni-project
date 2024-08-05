import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useOutsideClick } from "utils";
import { popUpBasicCss } from "styles/global_blocks";
import { lightBackgroundBlue } from "styles/colors";
import { alwaysOnTop } from "styles/z_indexes";

const StyledContainer = styled.div`
  ${popUpBasicCss};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  position: absolute;
  width: 210px;
  z-index: ${alwaysOnTop};
`;

const StyledOptionButton = styled.button`
  display: block;
  font-size: 14px;
  padding: 15px;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${lightBackgroundBlue};
  }

  :disabled {
    cursor: default;
  }
`;

const ActionMenu = ({ hideMenu, options }) => {
  const ref = useRef();
  useOutsideClick(ref, hideMenu);

  return (
    <StyledContainer ref={ref}>
      {options &&
        options.map(({ name, onClick, disabled }) => (
          <StyledOptionButton
            onClick={onClick}
            disabled={disabled}
            key={`drop-down-button-${name}`}
          >
            {name}
          </StyledOptionButton>
        ))}
    </StyledContainer>
  );
};

ActionMenu.propTypes = {
  hideMenu: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default ActionMenu;
