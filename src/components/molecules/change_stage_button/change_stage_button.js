import React from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router";

import { Button } from "components/atoms";
import { useRequestWithProgressToastRollbar } from "utils";

const ChangeStageButton = ({ request, children, pathnameGenerate }) => {
  const { id } = useParams();
  const changeRequest = useRequestWithProgressToastRollbar(request);

  const history = useHistory();
  const pathname = pathnameGenerate(id);

  return (
    <Button
      onClick={async () => {
        const success = await changeRequest(id);
        if (success) {
          history.location = "";
          history.replace({
            pathname: ``,
          });
          history.replace({
            pathname,
          });
        }
      }}
    >
      {children}
    </Button>
  );
};

ChangeStageButton.propTypes = {
  request: PropTypes.func.isRequired,
  children: PropTypes.string,
  pathnameGenerate: PropTypes.func.isRequired,
};

export default ChangeStageButton;
