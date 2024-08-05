import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal } from "components/atoms";

import OriginationChecklistContent from "./origination_checklist_content";
import { ListButton } from "../styled_further";

const OriginationChecklist = ({ further }) => {
  const [shouldShowEditingModal, setShouldShowEditingModal] = useState();

  const onEdit = () => setShouldShowEditingModal(true);
  const onClose = () => setShouldShowEditingModal(false);
  return (
    <>
      <Modal isOpen={shouldShowEditingModal} onClose={onClose}>
        <OriginationChecklistContent further={further} />
      </Modal>
      <ListButton onClick={onEdit}>Origination Checklist</ListButton>
    </>
  );
};

OriginationChecklist.propTypes = {
  further: PropTypes.object.isRequired,
};

export default OriginationChecklist;
