import React from "react";
import PropTypes from "prop-types";

import { dateFormat } from "utils";
import { Button } from "components/atoms";

import useActionContext from "./use_action_context";

function ResubmitAction({ further, readOnlyView = false }) {
  const { user, request } = useActionContext(further);
  const { underwriterFlow = {} } = further;
  if (underwriterFlow?.ReturnDate === undefined || readOnlyView) {
    return null;
  }
  return (
    <div>
      <p>
        Returned on: {dateFormat(underwriterFlow?.ReturnDate)} with comment:{" "}
        {underwriterFlow?.ReturnComment}
      </p>
      <p>Please resubmit after fixing all of the issues.</p>
      <Button
        onClick={() =>
          request("submitToUnderwriter", {
            User: user,
            Date: new Date(),
          })
        }
      >
        Resubmit
      </Button>
    </div>
  );
}

ResubmitAction.propTypes = {
  further: PropTypes.object.isRequired,
  readOnlyView: PropTypes.bool,
};

export default ResubmitAction;
