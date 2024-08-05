import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeletingModal } from "components/organisms";
import { Button } from "components/atoms";

import useDeleteCrossCollateralisedLoan from "./use_delete_cross_collateralised_loan";
import useCrossCollateralisedLoansData from "./use_cross_collateralised_loans_data";

const DeleteCrossCollateralisedLoan = ({ crossCollateralisedLoan }) => {
  const { id } = useParams();
  const {
    fetchCrossCollateralisedLoansAndStore,
  } = useCrossCollateralisedLoansData(false);
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useDeleteCrossCollateralisedLoan(
    crossCollateralisedLoan.caseUuid
  );

  const sendDeletingRequest = () => {
    deleteRequest(id).then(() => {
      fetchCrossCollateralisedLoansAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to delete Cross-Collateralised Loan ${crossCollateralisedLoan.caseRef}?`}
        isModalShowed={shouldShowDeletingModal}
        hideModal={() => setShouldShowDeletingModal()}
        isError={false}
        sendDeletingRequest={sendDeletingRequest}
      />
      <Button onClick={onDelete}>Delete</Button>
    </>
  );
};

DeleteCrossCollateralisedLoan.propTypes = {
  crossCollateralisedLoan: PropTypes.object.isRequired,
};

export default DeleteCrossCollateralisedLoan;
