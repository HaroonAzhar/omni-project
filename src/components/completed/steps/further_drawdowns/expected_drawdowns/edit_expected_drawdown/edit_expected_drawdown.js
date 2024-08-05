import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import EditExpectedDrawdownContent from "./edit_expected_drawdown_content";

function EditExpectedDrawdown({ expectedDrawdown }) {
  const [editDrawdownModalVisible, setEditDrawdownModalVisible] = useState(
    false
  );

  const closeEdit = () => setEditDrawdownModalVisible(false);

  const openEdit = () => setEditDrawdownModalVisible(true);
  return (
    <>
      <Modal isOpen={editDrawdownModalVisible} onClose={closeEdit}>
        <EditExpectedDrawdownContent
          closeEdit={closeEdit}
          expectedDrawdown={expectedDrawdown}
        />
      </Modal>
      <Button onClick={openEdit}>Edit</Button>
    </>
  );
}

EditExpectedDrawdown.propTypes = {
  expectedDrawdown: PropTypes.object.isRequired,
};

export default EditExpectedDrawdown;
