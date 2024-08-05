import React from "react";
import PropTypes from "prop-types";
import { humanize, underscore } from "inflected";

import { Button, Label } from "components/atoms";
import { dateFormat } from "utils";

import useActionContext from "./use_action_context";

const ChecklistAction = ({
  action,
  further,
  explanation,
  label = undefined,
  readOnlyView = false,
}) => {
  const { user, request } = useActionContext(further);

  const details = further.originationChecklist[action];
  const textLabel = label ?? humanize(underscore(action));
  if (details?.Date) {
    return (
      <div>
        Performed {textLabel} on: {dateFormat(details.Date)} by: {details.User}
      </div>
    );
  }
  const canNotPerformAction = !further.originationChecklist?.availableActions?.includes(
    action
  );

  if (readOnlyView) {
    return null;
  }
  const actionId = `action-${action}`;
  return (
    <>
      {canNotPerformAction && <Label text={explanation} htmlFor={actionId} />}
      <Button
        id={actionId}
        onClick={() =>
          request(action, {
            User: user,
            Date: new Date(),
          })
        }
        disabled={canNotPerformAction}
      >
        {textLabel}
      </Button>
    </>
  );
};

ChecklistAction.propTypes = {
  further: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  readOnlyView: PropTypes.bool,
  explanation: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ChecklistAction;
