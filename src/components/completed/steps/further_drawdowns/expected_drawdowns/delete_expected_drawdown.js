import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { DeletingModal } from "components/organisms";
import { dateFormat } from "utils";
import { Button } from "components/atoms";

import useDeleteExpectedDrawdown from "./use_delete_expected_drawdown";
import useExpectedDrawdownsData from "./use_expected_drawdowns_data";

const DeleteExpectedDrawdown = ({ expectedDrawdown }) => {
  const { id } = useParams();
  const { fetchExpectedDrawdownsAndStore } = useExpectedDrawdownsData(false);
  const [shouldShowDeletingModal, setShouldShowDeletingModal] = useState();

  const onDelete = () => setShouldShowDeletingModal(true);
  const deleteRequest = useDeleteExpectedDrawdown(
    expectedDrawdown.ExpectedDrawdownId
  );

  const sendDeletingRequest = () => {
    deleteRequest(id).then(() => {
      fetchExpectedDrawdownsAndStore();
      setShouldShowDeletingModal(false);
    });
  };

  return (
    <>
      <DeletingModal
        content={`Do you want to delete default Expected Drawdown from ${dateFormat(
          expectedDrawdown.Date
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

DeleteExpectedDrawdown.propTypes = {
  expectedDrawdown: PropTypes.object.isRequired,
};

export default DeleteExpectedDrawdown;
