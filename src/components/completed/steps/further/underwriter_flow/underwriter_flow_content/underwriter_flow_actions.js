import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, TextAreaInput } from "components/atoms";
import { dateFormat } from "utils";
import { useUser } from "hooks";

import {
  UnderwriterFlowActionWrapper,
  UnderwriterFlowActionsWrapper,
} from "./styled_underwriter_flow_content";

function UnderwriterFlowActions({
  underwriterFlow,
  endpointRequest,
  readOnlyView = false,
}) {
  const [comment, setComment] = useState("");

  const user = useUser();
  return (
    <UnderwriterFlowActionsWrapper>
      <UnderwriterFlowActionWrapper>
        {underwriterFlow.ReturnDate ? (
          <div>
            Returned on: {dateFormat(underwriterFlow.ReturnDate)} with comment:{" "}
            {underwriterFlow.ReturnComment}
          </div>
        ) : (
          !readOnlyView && (
            <>
              <TextAreaInput
                input={{ onChange: (e) => setComment(e.target.value) }}
                label="Comment"
                meta={{}}
              />
              <Button
                onClick={() =>
                  endpointRequest("return", {
                    User: user,
                    Date: new Date(),
                    Comment: comment,
                  })
                }
              >
                Return with comment
              </Button>{" "}
            </>
          )
        )}
      </UnderwriterFlowActionWrapper>
      <UnderwriterFlowActionWrapper>
        {underwriterFlow.UnderwriterApprovalDate ? (
          <div>
            Approved on: {dateFormat(underwriterFlow.UnderwriterApprovalDate)}
          </div>
        ) : (
          <Button
            onClick={() =>
              endpointRequest("approve", {
                User: user,
                Date: new Date(),
              })
            }
          >
            Approve
          </Button>
        )}
      </UnderwriterFlowActionWrapper>
    </UnderwriterFlowActionsWrapper>
  );
}

UnderwriterFlowActions.propTypes = {
  underwriterFlow: PropTypes.object.isRequired,
  endpointRequest: PropTypes.func.isRequired,
  readOnlyView: PropTypes.bool,
};

export default UnderwriterFlowActions;
