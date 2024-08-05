import React from "react";
import PropTypes from "prop-types";

import TagPreview from "components/admin/tag/tag_preview";

const CaseTagsCell = ({ row }) => {
  return row.original.associatedTags.map((tag) => (
    <TagPreview color={tag.ColorCode} name={tag.Name} />
  ));
};

CaseTagsCell.propTypes = {
  row: PropTypes.object.isRequired,
};

export default CaseTagsCell;
