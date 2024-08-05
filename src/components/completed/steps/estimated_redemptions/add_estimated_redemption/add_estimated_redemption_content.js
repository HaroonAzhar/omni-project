import React from "react";
import PropTypes from "prop-types";

import { H2 } from "components/atoms";

import useSaveEstimatedRedemption from "../use_save_estimated_redemption";
import EstimatedRedemptionForm from "../estimated_redemption_form";
import useEstimatedRedemptionsData from "../use_estimated_redemptions_data";

function AddEstimatedRedemptionContent({ closeAdd }) {
  const saveEstimatedRedemption = useSaveEstimatedRedemption();
  const {
    fetchEstimatedRedemptionsAndStore,
    estimatedRedemptions,
  } = useEstimatedRedemptionsData(false);

  const saveRequest = (values) => {
    saveEstimatedRedemption(values).then((res) => {
      if (res) {
        fetchEstimatedRedemptionsAndStore();
        closeAdd();
      }
    });
  };

  return (
    <>
      <H2>Add Expected Drawdown</H2>
      <EstimatedRedemptionForm
        saveRequest={saveRequest}
        close={closeAdd}
        existing={estimatedRedemptions}
      />
    </>
  );
}

AddEstimatedRedemptionContent.propTypes = {
  closeAdd: PropTypes.func.isRequired,
};
export default AddEstimatedRedemptionContent;
