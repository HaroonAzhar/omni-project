import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useOutsideClick } from "utils";
import { popUpBasicCss } from "styles/global_blocks";
import { lightBackgroundBlue } from "styles/colors";
import { alwaysOnTop } from "styles/z_indexes";

const StyledContainer = styled.div`
  ${popUpBasicCss};
  overflow: hidden;
  position: absolute;
  transform: translateX(-20%);
  z-index: ${alwaysOnTop};
`;

const StyledOptionButton = styled.button`
  display: block;
  font-size: 14px;
  padding: 10px;
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
        options
          .filter(({ onClick }) => onClick)
          .map(({ label, onClick, key }) => (
            <StyledOptionButton onClick={onClick} key={key}>
              {label}
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
