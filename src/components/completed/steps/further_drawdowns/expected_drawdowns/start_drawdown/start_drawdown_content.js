import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useParams } from "react-router-dom";

import useExpectedDrawdownsData from "../use_expected_drawdowns_data";
import useAllFurtherDrawdownsData from "../../use_all_further_drawdowns_data";
import AddFurtherDrawdown from "../../add_further_drawdown";
import useDeleteExpectedDrawdown from "../use_delete_expected_drawdown";

function StartDrawdownContent({ closeStart, expectedDrawdown }) {
  const { id } = useParams();

  const { fetchExpectedDrawdownsAndStore } = useExpectedDrawdownsData(false);

  const deleteRequest = useDeleteExpectedDrawdown(
    expectedDrawdown.ExpectedDrawdownId
  );
  const {
    closeAdd,
    latestStatement,
    totalGDV,
    totalValuations,
    availableDrawdownFunds,
  } = useAllFurtherDrawdownsData();

  const close = () => {
    closeAdd();
    closeStart();
  };

  const onSuccess = () => {
    deleteRequest(id).then(() => {
      fetchExpectedDrawdownsAndStore();
      closeStart();
    });
  };
  return (
    <>
      <AddFurtherDrawdown
        currentStatement={latestStatement}
        totalGDV={totalGDV}
        totalValuations={totalValuations}
        closeAdd={close}
        availableDrawdownFunds={availableDrawdownFunds}
        initialValues={{
          RequestedAmount: expectedDrawdown.Amount,
          RequestedDate: moment(expectedDrawdown.Date).format(
            moment.HTML5_FMT.DATE
          ),
        }}
        successCallback={onSuccess}
      />
    </>
  );
}

StartDrawdownContent.propTypes = {
  closeStart: PropTypes.func.isRequired,
  expectedDrawdown: PropTypes.object.isRequired,
};
export default StartDrawdownContent;
