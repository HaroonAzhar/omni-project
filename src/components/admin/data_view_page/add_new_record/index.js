import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { Button } from "components/atoms";
import { addAdminRecord } from "store/admin";

const AddNewRecord = ({ page }) => {
  const dispatch = useDispatch();
  const addRecord = () => {
    dispatch(addAdminRecord({ page }));
  };
  return <Button onClick={() => addRecord()}>Add New</Button>;
};

export default AddNewRecord;

AddNewRecord.propTypes = {
  page: PropTypes.string.isRequired,
};
