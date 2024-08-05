import React from "react";
import PropTypes from "prop-types";

import {
  RichTextContentTitle,
  RichTextContentWrapper,
} from "./styled_rich_text_content";

const RichTextContent = ({ children, title }) => {
  return (
    <RichTextContentWrapper>
      <RichTextContentTitle>{title}:</RichTextContentTitle>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </RichTextContentWrapper>
  );
};

RichTextContent.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RichTextContent;
