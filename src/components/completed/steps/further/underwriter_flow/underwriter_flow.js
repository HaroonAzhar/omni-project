import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "components/atoms";

import UnderwriterFlowContent from "./underwriter_flow_content";
import { ListButton } from "../styled_further";

const UnderwriterFlow = ({ further }) => {
  const [shouldShowEditingModal, setShouldShowEditingModal] = useState();

  const onEdit = () => setShouldShowEditingModal(true);
  const onClose = () => setShouldShowEditingModal(false);
  return (
    <>
      <Modal isOpen={shouldShowEditingModal} onClose={onClose}>
        <UnderwriterFlowContent further={further} />
      </Modal>
      <ListButton onClick={onEdit}>Underwriter Flow</ListButton>
    </>
  );
};

UnderwriterFlow.propTypes = {
  further: PropTypes.object.isRequired,
};

export default UnderwriterFlow;
