import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Modal } from "components/atoms";

import StartDrawdownContent from "./start_drawdown_content";

function StartDrawdown({ expectedDrawdown }) {
  const [startDrawdownModalVisible, setStartDrawdownModalVisible] = useState(
    false
  );

  const closeStart = () => setStartDrawdownModalVisible(false);

  const openStart = () => setStartDrawdownModalVisible(true);
  return (
    <>
      <Modal isOpen={startDrawdownModalVisible} onClose={closeStart}>
        <StartDrawdownContent
          closeStart={closeStart}
          expectedDrawdown={expectedDrawdown}
        />
      </Modal>
      <Button onClick={openStart}>Start Drawdown</Button>
    </>
  );
}

StartDrawdown.propTypes = {
  expectedDrawdown: PropTypes.object.isRequired,
};

export default StartDrawdown;
