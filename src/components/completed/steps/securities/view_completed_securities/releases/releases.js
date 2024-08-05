import React from "react";
import PropTypes from "prop-types";

import ReleaseDetails from "./release_details";
import MarkAsReleased from "./mark_as_released";

function Releases({ security }) {
  return security.isReleased ? (
    <ReleaseDetails releaseDetails={security.releases[0]} />
  ) : (
    <MarkAsReleased security={security} />
  );
}

Releases.propTypes = {
  security: PropTypes.object.isRequired,
};

export default Releases;
