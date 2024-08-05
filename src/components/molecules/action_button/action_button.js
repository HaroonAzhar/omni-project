import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { lightGrey } from "styles/colors";

import ActionMenu from "./action_menu";
const StyledActionButton = styled.button`
  display: flex;
  padding: 10px;
`;

const Dot = styled.span`
  padding-bottom: 0.25em;

  &:before {
    content: "";
    display: block;
    width: 4px;
    height: 4px;
    background: ${lightGrey};
    border-radius: 100%;
    margin-right: 5px;
  }

  &:last-child:before {
    margin-right: 0;
  }
`;

const ActionButton = ({ options }) => {
  const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);
  const hideMenu = () => setIsActionMenuVisible(false);

  return (
    <>
      <StyledActionButton
        onClick={() => {
          setIsActionMenuVisible(!isActionMenuVisible);
        }}
      >
        <Dot />
        <Dot />
        <Dot />
      </StyledActionButton>

      {isActionMenuVisible && (
        <ActionMenu hideMenu={hideMenu} options={options} />
      )}
    </>
  );
};

ActionButton.propTypes = {
  options: PropTypes.array.isRequired,
};

export default ActionButton;
