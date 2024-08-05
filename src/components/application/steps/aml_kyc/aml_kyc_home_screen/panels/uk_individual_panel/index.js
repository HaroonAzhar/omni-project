import React from "react";
import PropTypes from "prop-types";

import ProofOf from "../shared/proof_of";
import Panel from "../../panel";
import IndividualQuestions, {
  individualFieldsReferral,
} from "../shared/individual_questions";

const UkIndividualPanel = ({ applicant, modifyApplicant, readOnly }) => {
  return (
    <Panel
      applicant={applicant}
      modifyApplicant={modifyApplicant}
      left={(values) => (
        <ProofOf
          disabled={readOnly}
          values={values}
          showAdditionalProofOfAddress={false}
        />
      )}
      right={() => <IndividualQuestions disabled={readOnly} />}
      referralFunctions={individualFieldsReferral}
      readOnly={readOnly}
    />
  );
};
export default UkIndividualPanel;

UkIndividualPanel.propTypes = {
  applicant: PropTypes.object.isRequired,
  modifyApplicant: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};
