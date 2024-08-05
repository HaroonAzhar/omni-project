import React, { useState } from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { Cell } from "components/molecules";
import { Button, Modal } from "components/atoms";

import { StyledLoanStatus } from "./styled_loan_status";
import { title } from "./consts";
import ManualStatusForm from "./manual_status_form";

const LoanStatus = ({
  loanStatus,
  automaticLoanStatus,
  dateOfCompletion,
  lastManualStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  return (
    <>
      <Cell className="loan-status-cell" title="Loan Status:">
        <StyledLoanStatus>
          {titleize(loanStatus)}
          <Button onClick={openModal}>{title}</Button>
        </StyledLoanStatus>
      </Cell>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ManualStatusForm
          automaticLoanStatus={automaticLoanStatus}
          dateOfCompletion={dateOfCompletion}
          onClose={closeModal}
          lastManualStatus={lastManualStatus}
        />
      </Modal>
    </>
  );
};

LoanStatus.propTypes = {
  loanStatus: PropTypes.string.isRequired,
  automaticLoanStatus: PropTypes.string.isRequired,
  dateOfCompletion: PropTypes.string.isRequired,
  lastManualStatus: PropTypes.object,
};

export default LoanStatus;
