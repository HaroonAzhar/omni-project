import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import TagPreview from "components/admin/tag/tag_preview";
import { isBackgroundDark } from "components/admin/tag/helpers/tag_preview_helpers";
import { useRequestWithProgressToastRollbar } from "utils";
import { useAssociatedTagsData } from "hooks";
import { deleteAssociatedTag } from "utils/requests";

import {
  CaseAssociatedTagsWrapper,
  StyledRemoveButton,
} from "./styled_case_tags";

export const CaseTagsView = ({ associatedTags, sendDeletingRequest }) => {
  return (
    <CaseAssociatedTagsWrapper>
      {associatedTags &&
        associatedTags.map((tag) => (
          <TagPreview color={tag.ColorCode} name={tag.Name}>
            <StyledRemoveButton
              color={tag.ColorCode}
              isBackgroundDark={isBackgroundDark(tag.ColorCode)}
              onClick={() => {
                sendDeletingRequest(tag.Id);
              }}
              type="button"
            >
              x
            </StyledRemoveButton>
          </TagPreview>
        ))}
    </CaseAssociatedTagsWrapper>
  );
};

CaseTagsView.propTypes = {
  associatedTags: PropTypes.array,
  sendDeletingRequest: PropTypes.func,
};

export const useCaseTags = () => {
  const { id } = useParams();
  const deleteRequest = useRequestWithProgressToastRollbar(deleteAssociatedTag);
  const { fetchAssociatedTagsAndStore, associatedTags } = useAssociatedTagsData(
    true
  );

  const sendDeletingRequest = (tagId) => {
    deleteRequest(id, tagId).then(() => {
      fetchAssociatedTagsAndStore();
    });
  };

  return { associatedTags, sendDeletingRequest };
};

const CaseTags = () => {
  const { associatedTags, sendDeletingRequest } = useCaseTags();

  return (
    <CaseTagsView
      associatedTags={associatedTags}
      sendDeletingRequest={sendDeletingRequest}
    />
  );
};

export default CaseTags;
