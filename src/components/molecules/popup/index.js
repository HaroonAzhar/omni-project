import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal, Button } from "components/atoms";
import { big } from "styles/button_sizes";
import { darkGrey } from "styles/colors";

const StyledButton = styled(Button)`
  height: 100%;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  height: ${big};
  justify-content: space-between;
  width: 100%;
  ${({ shouldCenter }) => shouldCenter && "justify-content: center;"}
`;

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 195px;
  justify-content: center;
  text-align: center;
  width: 475px;
`;

const StyledTitle = styled.h1`
  color: ${darkGrey};
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledDesc = styled.span`
  margin-bottom: 42px;
`;

const Popup = ({
  title,
  desc,
  isOpen,
  onClose,
  secondaryButton,
  primaryButton,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledDiv>
        <StyledTitle>{title}</StyledTitle>

        <StyledDesc>{desc}</StyledDesc>

        <StyledButtonsContainer shouldCenter={!primaryButton}>
          <StyledButton
            {...secondaryButton} // eslint-disable-line react/jsx-props-no-spreading
            kind="secondary"
          />

          {primaryButton && (
            <StyledButton
              {...primaryButton} // eslint-disable-line react/jsx-props-no-spreading
              kind="primary"
            />
          )}
        </StyledButtonsContainer>
      </StyledDiv>
    </Modal>
  );
};

export default Popup;

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  secondaryButton: PropTypes.object.isRequired,
  primaryButton: PropTypes.object.isRequired,
};
