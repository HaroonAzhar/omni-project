import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import AddSecurityRelease from "./add_security_release";
import { MarkAsWrapper } from "../styled_view_completed_securities";

function MarkAsReleased({ security }) {
  const [addReleaseModalVisible, setAddNotModalVisible] = useState(false);

  const closeAdd = () => setAddNotModalVisible(false);
  const openAdd = () => setAddNotModalVisible(true);
  return (
    <MarkAsWrapper>
      <Modal isOpen={addReleaseModalVisible} onClose={closeAdd}>
        <AddSecurityRelease security={security} closeAdd={closeAdd} />
      </Modal>
      <Button onClick={openAdd}>Mark as Released</Button>
    </MarkAsWrapper>
  );
}

MarkAsReleased.propTypes = {
  security: PropTypes.object.isRequired,
};

export default MarkAsReleased;
