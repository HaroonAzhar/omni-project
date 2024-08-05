import React from "react";
import PropTypes from "prop-types";

import ProofOf from "../shared/proof_of";
import Panel from "../../panel";
import IndividualQuestions, {
  individualFieldsReferral,
} from "../shared/individual_questions";
import ProofOfRightToRemain, {
  individualFieldsReferralProof,
} from "./proof_of_right_to_remain";
import ClientArrival from "./client_arrival";
import ThirdPartyVerification from "./third_party_verification";

const mergedReferralFields = {
  ...individualFieldsReferral,
  ...individualFieldsReferralProof,
};

const NonUkIndividualPanel = ({ applicant, modifyApplicant, readOnly }) => {
  const LeftPart = (values) => (
    <>
      <ProofOf values={values} disabled={readOnly} />
      <ProofOfRightToRemain
        applicant={applicant}
        values={values}
        disabled={readOnly}
      />
      <ClientArrival disabled={readOnly} />
      <ThirdPartyVerification disabled={readOnly} />
    </>
  );
  return (
    <Panel
      applicant={applicant}
      modifyApplicant={modifyApplicant}
      left={LeftPart}
      right={() => <IndividualQuestions disabled={readOnly} />}
      referralFunctions={mergedReferralFields}
      readOnly={readOnly}
    />
  );
};
export default NonUkIndividualPanel;

NonUkIndividualPanel.propTypes = {
  applicant: PropTypes.object.isRequired,
  modifyApplicant: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};
