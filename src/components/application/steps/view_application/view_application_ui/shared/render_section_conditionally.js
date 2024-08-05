import React from "react";
import PropTypes from "prop-types";

import Column from "./column";
import Columns from "./columns";

const RenderSectionConditionally = ({
  children,
  status,
  newStatus = "New",
}) => {
  return (
    <>
      {status === newStatus ? (
        <Columns>
          <Column>This section has not been completed.</Column>
        </Columns>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

RenderSectionConditionally.propTypes = {
  status: PropTypes.string,
  children: PropTypes.node,
  newStatus: PropTypes.string,
};

export default RenderSectionConditionally;
