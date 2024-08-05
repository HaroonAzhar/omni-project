import React from "react";
import PropTypes from "prop-types";

import { H2 } from "components/atoms";

import useSaveExpectedDrawdown from "../use_save_expected_drawdown";
import ExpectedDrawdownForm from "../expected_drawdown_form";
import useExpectedDrawdownsData from "../use_expected_drawdowns_data";

function AddExpectedDrawdownContent({ closeAdd }) {
  const saveExpectedDrawdown = useSaveExpectedDrawdown();
  const { fetchExpectedDrawdownsAndStore } = useExpectedDrawdownsData(false);

  const saveRequest = (values) => {
    saveExpectedDrawdown(values).then((res) => {
      if (res) {
        fetchExpectedDrawdownsAndStore();
        closeAdd();
      }
    });
  };

  return (
    <>
      <H2>Add Expected Drawdown</H2>
      <ExpectedDrawdownForm saveRequest={saveRequest} close={closeAdd} />
    </>
  );
}

AddExpectedDrawdownContent.propTypes = {
  closeAdd: PropTypes.func.isRequired,
};
export default AddExpectedDrawdownContent;
