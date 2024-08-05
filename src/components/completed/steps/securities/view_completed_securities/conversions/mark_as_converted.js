import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import AddSecurityConversion from "./add_security_conversion";
import { MarkAsWrapper } from "../styled_view_completed_securities";

function MarkAsConverted({ security }) {
  const [addConversionModalVisible, setAddNotModalVisible] = useState(false);

  const closeAdd = () => setAddNotModalVisible(false);
  const openAdd = () => setAddNotModalVisible(true);
  return (
    <MarkAsWrapper>
      <Modal isOpen={addConversionModalVisible} onClose={closeAdd}>
        <AddSecurityConversion security={security} closeAdd={closeAdd} />
      </Modal>
      <Button onClick={openAdd}>Mark as Converted</Button>
    </MarkAsWrapper>
  );
}

MarkAsConverted.propTypes = {
  security: PropTypes.object.isRequired,
};

export default MarkAsConverted;
