import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeleteIcon } from "components/icons";
import { DeletingModal } from "components/organisms";
import { dateFormat, useRequestWithProgressToastRollbar } from "utils";
import { deleteAdjustment } from "utils/requests";

import useAdjustmentsData from "./use_adjustments_data";

const CancelAdjustment = ({ adjustment }) => {
  const { id } = useParams();
  const { fetchAdjustmentsAndStore } = useAdjustmentsData(false);
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useRequestWithProgressToastRollbar(deleteAdjustment);

  const sendDeletingRequest = () => {
    deleteRequest(id, adjustment.AdjustmentId).then(() => {
      fetchAdjustmentsAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to cancel Adjustment ${
          adjustment.TransactionType
        } from ${dateFormat(adjustment.Date)}?`}
        isModalShowed={shouldShowDeletingModal}
        hideModal={() => setShouldShowDeletingModal()}
        isError={false}
        sendDeletingRequest={sendDeletingRequest}
      />
      <button type="button" onClick={onDelete}>
        <DeleteIcon />
      </button>
    </>
  );
};

CancelAdjustment.propTypes = {
  adjustment: PropTypes.object.isRequired,
};

export default CancelAdjustment;
