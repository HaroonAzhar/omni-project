import React, { useState } from "react";

import { Button, Modal } from "components/atoms";

import AddNewSecurityContent from "./add_new_security_content";

export default function AddNewSecurity() {
  const [addSecurityModalVisible, setAddSecurityModalVisible] = useState(false);

  const closeAdd = () => {
    setAddSecurityModalVisible(false);
  };
  const openAdd = () => setAddSecurityModalVisible(true);
  return (
    <div>
      <Modal isOpen={addSecurityModalVisible} onClose={closeAdd}>
        <AddNewSecurityContent closeAdd={closeAdd} />
      </Modal>
      <Button onClick={openAdd}>Add New Security</Button>
    </div>
  );
}
