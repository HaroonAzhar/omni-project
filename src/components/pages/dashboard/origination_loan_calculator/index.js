import React, { useState } from "react";

import { Button, Modal } from "components/atoms";

import OriginationLoanCalculatorForm from "./origination_loan_calculator_form";

const OriginationLoanCalculator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => setModalVisible(true);
  const handleModalClose = () => setModalVisible(false);
  return (
    <>
      <Button kind="link" onClick={handleModalOpen}>
        Pop-up Calculator
      </Button>
      <Modal isOpen={modalVisible} onClose={handleModalClose}>
        <OriginationLoanCalculatorForm />
      </Modal>
    </>
  );
};

export default OriginationLoanCalculator;
