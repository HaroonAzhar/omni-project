import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import EditEstimatedRedemptionContent from "./edit_estimated_redemption_content";

function EditEstimatedRedemption({ estimatedRedemption }) {
  const [editDrawdownModalVisible, setEditDrawdownModalVisible] = useState(
    false
  );

  const closeEdit = () => setEditDrawdownModalVisible(false);

  const openEdit = () => setEditDrawdownModalVisible(true);
  return (
    <>
      <Modal isOpen={editDrawdownModalVisible} onClose={closeEdit}>
        <EditEstimatedRedemptionContent
          closeEdit={closeEdit}
          estimatedRedemption={estimatedRedemption}
        />
      </Modal>
      <Button onClick={openEdit}>Edit</Button>
    </>
  );
}

EditEstimatedRedemption.propTypes = {
  estimatedRedemption: PropTypes.object.isRequired,
};

export default EditEstimatedRedemption;
