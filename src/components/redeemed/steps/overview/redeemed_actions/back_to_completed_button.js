import React from "react";
import PropTypes from "prop-types";

import { ChangeStageButton } from "components/molecules";
import { convertToCompleted } from "utils/requests";

const BackToCompleted = ({ redeemedData }) => {
  const reopenCase = (id) => {
    convertToCompleted(id, redeemedData);
  };
  return (
    <ChangeStageButton
      pathnameGenerate={(id) => `/completed/${id}`}
      request={async (id) => {
        reopenCase(id);
      }}
    >
      {"<< Re-Open Case"}
    </ChangeStageButton>
  );
};

BackToCompleted.propTypes = {
  redeemedData: PropTypes.object.isRequired,
};

export default BackToCompleted;
