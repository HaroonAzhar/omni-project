import React from "react";
import PropTypes from "prop-types";

import {
  ChecklistActionWrapper,
  ChecklistActionsWrapper,
} from "../styled_origination_checklist";
import ChecklistAction from "./checklist_action";
import ResubmitAction from "./resubmit_action";
import CancelAction from "./cancel_action";

const ChecklistActions = ({ further, readOnlyView = false }) => {
  return (
    <ChecklistActionsWrapper>
      <ChecklistActionWrapper>
        <CancelAction further={further} readOnlyView={readOnlyView} />
      </ChecklistActionWrapper>
      <ChecklistActionWrapper>
        <ChecklistAction
          action="initialCheck"
          further={further}
          readOnlyView={readOnlyView}
          label="Mark checklist completed"
          explanation="All sections have to be completed before the checklist can be marked as completed"
        />
      </ChecklistActionWrapper>

      <ChecklistActionWrapper>
        <ChecklistAction
          action="finalSignOf"
          further={further}
          readOnlyView={readOnlyView}
          label="Confirm checklist completed"
          explanation="Checklist have to be completed before the checklist can be confirmed as completed"
        />
      </ChecklistActionWrapper>

      <ChecklistActionWrapper>
        <ChecklistAction
          action="submitToUnderwriter"
          further={further}
          readOnlyView={readOnlyView}
          explanation="Checklist have to be confirmed before the checklist can be submitted to underwriter"
        />
      </ChecklistActionWrapper>

      <ChecklistActionWrapper>
        <ResubmitAction further={further} readOnlyView={readOnlyView} />
      </ChecklistActionWrapper>
    </ChecklistActionsWrapper>
  );
};

ChecklistActions.propTypes = {
  further: PropTypes.object.isRequired,

  readOnlyView: PropTypes.bool,
};

export default ChecklistActions;
