import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button } from "components/atoms";

import getResultState from "./get_result_state";

const ReferralMessageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const Result = ({ form, referredLink, needsToBeSaved }) => {
  const { noIncompleteFields, noReferralFields } = getResultState(form);
  const history = useHistory();
  if (noIncompleteFields === 0 && noReferralFields === 0) {
    return "OK";
  }
  const incompletePart = noIncompleteFields !== 0 && (
    <div>{`${noIncompleteFields} incomplete Fields`}</div>
  );
  const saveAndViewReferral = () => {
    if (needsToBeSaved) {
      form.submit();
    }

    history.push(referredLink);
  };

  const referralPart = noReferralFields !== 0 && (
    <ReferralMessageWrapper>
      {`Please refer to MLRO for the ${noReferralFields} fail(s)`}

      {referredLink && (
        <Button type="button" onClick={saveAndViewReferral}>
          {needsToBeSaved ? `Save and View Referral` : `View Referral`}
        </Button>
      )}
    </ReferralMessageWrapper>
  );

  return (
    <div>
      {incompletePart}
      {referralPart}
    </div>
  );
};

export default Result;

Result.propTypes = {
  form: PropTypes.object.isRequired,
  referredLink: PropTypes.string,
  needsToBeSaved: PropTypes.bool,
};
