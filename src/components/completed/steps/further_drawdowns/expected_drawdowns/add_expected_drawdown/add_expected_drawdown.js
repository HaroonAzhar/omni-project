import React, { useState } from "react";

import { Button, Modal } from "components/atoms";

import AddExpectedDrawdownContent from "./add_expected_drawdown_content";

function AddExpectedDrawdown() {
  const [addDrawdownModalVisible, setAddDrawdownModalVisible] = useState(false);

  const closeAdd = () => setAddDrawdownModalVisible(false);

  const openAdd = () => setAddDrawdownModalVisible(true);
  return (
    <>
      <Modal isOpen={addDrawdownModalVisible} onClose={closeAdd}>
        <AddExpectedDrawdownContent closeAdd={closeAdd} />
      </Modal>
      <Button onClick={openAdd}>Add</Button>
    </>
  );
}

export default AddExpectedDrawdown;
