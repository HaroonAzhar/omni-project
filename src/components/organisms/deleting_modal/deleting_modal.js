import React from "react";

import { Modal } from "components/atoms";

import {
  StyledButton,
  StyledButtonsContainer,
  StyledError,
  StyledModalTitle,
} from "../../pages/dashboard/styled_dashboard";

const DeletingModal = ({
  /* eslint-disable */
  content,
  isModalShowed,
  hideModal,
  isError,
  sendDeletingRequest,
  className,
  /* eslint-enable */
}) => (
  <Modal className={className} isOpen={isModalShowed} onClose={hideModal}>
    <StyledModalTitle>{content}</StyledModalTitle>

    <StyledError>{isError && "Error ocurred!"}</StyledError>

    <StyledButtonsContainer>
      <StyledButton onClick={sendDeletingRequest} kind="secondary">
        Yes
      </StyledButton>
      <StyledButton onClick={hideModal}>No</StyledButton>
    </StyledButtonsContainer>
  </Modal>
);

export default DeletingModal;
