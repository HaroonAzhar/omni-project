import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Cell } from "components/molecules";
import { Button, Modal } from "components/atoms";
import { dateFormat } from "utils";

import ExtensionForm from "./extension_form";

const StyledMaturityDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MaturityDate = ({
  originalDateOfMaturity,
  extendedDateOfMaturity,
  currentInterestRate,
  currentDateOfMaturity,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  return (
    <>
      {extendedDateOfMaturity ? (
        <>
          <Cell
            className="original-maturity-date-cell"
            title="Original Maturity Date:"
          >
            <StyledMaturityDate>
              {dateFormat(originalDateOfMaturity)}
            </StyledMaturityDate>
          </Cell>
          <Cell
            className="extended-maturity-date-cell"
            title="Extended Maturity Date:"
          >
            <StyledMaturityDate>
              {dateFormat(extendedDateOfMaturity)}
              <Button onClick={openModal}>Add Extension</Button>
            </StyledMaturityDate>
          </Cell>
        </>
      ) : (
        <Cell className="maturity-date-cell" title="Maturity Date:">
          <StyledMaturityDate>
            {dateFormat(originalDateOfMaturity)}
            <Button onClick={openModal}>Add Extension</Button>
          </StyledMaturityDate>
        </Cell>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ExtensionForm
          currentMaturityDate={currentDateOfMaturity}
          currentInterestRate={currentInterestRate}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
};

MaturityDate.propTypes = {
  extendedDateOfMaturity: PropTypes.string,
  originalDateOfMaturity: PropTypes.string.isRequired,
  currentDateOfMaturity: PropTypes.string.isRequired,
  currentInterestRate: PropTypes.number.isRequired,
};

export default MaturityDate;
