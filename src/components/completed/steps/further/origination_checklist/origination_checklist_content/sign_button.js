import React from "react";
import PropTypes from "prop-types";

import { Button } from "components/atoms";

import { ChecklistRowSignature } from "./styled_origination_checklist";
import signatures from "./signatures";

const SignForOtherUser = ({ signature, sectionData, user, request }) => {
  const otherSignature = signatures.find((s) => s !== signature);
  const otherSectionAlreadySigned = sectionData[otherSignature]?.User === user;
  if (otherSectionAlreadySigned) {
    return "Awaiting second signature";
  }

  return (
    <Button
      onClick={() => {
        request(signature, {
          User: user,
          Date: new Date(),
        });
      }}
      kind="secondary"
    >
      Sign
    </Button>
  );
};

SignForOtherUser.propTypes = {
  signature: PropTypes.string.isRequired,
  sectionData: PropTypes.object.isRequired,
  user: PropTypes.string,
  request: PropTypes.func.isRequired,
};

const SignButton = ({ signature, sectionData, user, request }) => {
  return (
    <ChecklistRowSignature>
      {sectionData[signature] ? (
        <div>Signed by {sectionData[signature].User}</div>
      ) : (
        <SignForOtherUser
          signature={signature}
          sectionData={sectionData}
          user={user}
          request={request}
        />
      )}
    </ChecklistRowSignature>
  );
};

SignButton.propTypes = {
  signature: PropTypes.string.isRequired,
  sectionData: PropTypes.object.isRequired,
  user: PropTypes.string,
  request: PropTypes.func.isRequired,
};

export default SignButton;
