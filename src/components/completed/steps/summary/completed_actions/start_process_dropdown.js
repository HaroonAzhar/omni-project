import React, { useState } from "react";
import PropTypes from "prop-types";

import { ActionsDropdown } from "components/molecules";
import { Modal } from "components/atoms";

import ExtensionForm from "../extension_form";

const StartProcessDropdown = ({ dateOfMaturity, currentInterestRate }) => {
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const closeExtensionModal = () => setIsExtensionModalOpen(false);
  const openExtensionModal = () => setIsExtensionModalOpen(true);

  const processActions = {
    "Add Extension": openExtensionModal,
  };

  return (
    <ActionsDropdown actions={processActions} prompt="Start Process">
      <Modal isOpen={isExtensionModalOpen} onClose={closeExtensionModal}>
        <ExtensionForm
          currentMaturityDate={dateOfMaturity}
          currentInterestRate={currentInterestRate}
          onClose={closeExtensionModal}
        />
      </Modal>
    </ActionsDropdown>
  );
};

StartProcessDropdown.propTypes = {
  currentInterestRate: PropTypes.number.isRequired,
  dateOfMaturity: PropTypes.string.isRequired,
};

export default StartProcessDropdown;
