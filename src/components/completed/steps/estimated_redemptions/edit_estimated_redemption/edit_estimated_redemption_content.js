import React from "react";
import PropTypes from "prop-types";

import { H2 } from "components/atoms";

import useEditEstimatedRedemption from "../use_edit_estimated_redemption";
import EstimatedRedemptionForm from "../estimated_redemption_form";
import useEstimatedRedemptionsData from "../use_estimated_redemptions_data";

function EditEstimatedRedemptionContent({ closeEdit, estimatedRedemption }) {
  const editEstimatedRedemption = useEditEstimatedRedemption(
    estimatedRedemption.EstimatedRedemptionId
  );
  const {
    fetchEstimatedRedemptionsAndStore,
    estimatedRedemptions,
  } = useEstimatedRedemptionsData(false);

  const editRequest = (values) => {
    editEstimatedRedemption(values).then((res) => {
      if (res) {
        fetchEstimatedRedemptionsAndStore();
        closeEdit();
      }
    });
  };

  return (
    <>
      <H2>Edit Expected Drawdown</H2>
      <EstimatedRedemptionForm
        saveRequest={editRequest}
        close={closeEdit}
        initialValues={estimatedRedemption}
        existing={estimatedRedemptions}
      />
    </>
  );
}

EditEstimatedRedemptionContent.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  estimatedRedemption: PropTypes.object.isRequired,
};
export default EditEstimatedRedemptionContent;
