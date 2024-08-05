import React from "react";
import PropTypes from "prop-types";

import { H2 } from "components/atoms";

import useEditExpectedDrawdown from "../use_edit_expected_drawdown";
import ExpectedDrawdownForm from "../expected_drawdown_form";
import useExpectedDrawdownsData from "../use_expected_drawdowns_data";

function EditExpectedDrawdownContent({ closeEdit, expectedDrawdown }) {
  const editExpectedDrawdown = useEditExpectedDrawdown(
    expectedDrawdown.ExpectedDrawdownId
  );
  const { fetchExpectedDrawdownsAndStore } = useExpectedDrawdownsData(false);

  const editRequest = (values) => {
    editExpectedDrawdown(values).then((res) => {
      if (res) {
        fetchExpectedDrawdownsAndStore();
        closeEdit();
      }
    });
  };

  return (
    <>
      <H2>Edit Expected Drawdown</H2>
      <ExpectedDrawdownForm
        saveRequest={editRequest}
        close={closeEdit}
        initialValues={expectedDrawdown}
      />
    </>
  );
}

EditExpectedDrawdownContent.propTypes = {
  closeEdit: PropTypes.func.isRequired,
  expectedDrawdown: PropTypes.object.isRequired,
};
export default EditExpectedDrawdownContent;
