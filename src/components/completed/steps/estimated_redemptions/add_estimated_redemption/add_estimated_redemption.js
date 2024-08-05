import React, { useState } from "react";

import { Button, Modal } from "components/atoms";

import AddEstimatedRedemptionContent from "./add_estimated_redemption_content";

function AddEstimatedRedemption() {
  const [addDrawdownModalVisible, setAddDrawdownModalVisible] = useState(false);

  const closeAdd = () => setAddDrawdownModalVisible(false);

  const openAdd = () => setAddDrawdownModalVisible(true);
  return (
    <>
      <Modal isOpen={addDrawdownModalVisible} onClose={closeAdd}>
        <AddEstimatedRedemptionContent closeAdd={closeAdd} />
      </Modal>
      <Button onClick={openAdd}>Add</Button>
    </>
  );
}

export default AddEstimatedRedemption;
