import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeletingModal } from "components/organisms";
import { dateFormat } from "utils";
import { Button } from "components/atoms";

import useDeleteEstimatedRedemption from "./use_delete_estimated_redemption";
import useEstimatedRedemptionsData from "./use_estimated_redemptions_data";

const DeleteEstimatedRedemption = ({ estimatedRedemption }) => {
  const { id } = useParams();
  const { fetchEstimatedRedemptionsAndStore } = useEstimatedRedemptionsData(
    false
  );
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useDeleteEstimatedRedemption(
    estimatedRedemption.EstimatedRedemptionId
  );

  const sendDeletingRequest = () => {
    deleteRequest(id).then(() => {
      fetchEstimatedRedemptionsAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to delete default Expected Drawdown from ${dateFormat(
          estimatedRedemption.Date
        )}?`}
        isModalShowed={shouldShowDeletingModal}
        hideModal={() => setShouldShowDeletingModal()}
        isError={false}
        sendDeletingRequest={sendDeletingRequest}
      />
      <Button onClick={onDelete}>Delete</Button>
    </>
  );
};

DeleteEstimatedRedemption.propTypes = {
  estimatedRedemption: PropTypes.object.isRequired,
};

export default DeleteEstimatedRedemption;
