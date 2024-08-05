import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Quill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { lightGrey, white } from "styles/colors";

const StyledQuill = styled(Quill)`
  background: ${white};
  border: 1px solid ${lightGrey};
  border-radius: 8px;
  padding-bottom: 67px;
  width: 100%;

  & strong {
    font-weight: bolder;
  }

  & .ql-toolbar.ql-snow {
    border: none;
  }

  & .ql-container.ql-snow {
    border: none;
  }
`;

const modulesConfig = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
  ],
};

const RichTextEditor = ({ value, onChange, onFocus, readOnly = false }) => {
  return (
    <StyledQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modulesConfig}
      onFocus={onFocus}
      readOnly={readOnly}
    />
  );
};

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default RichTextEditor;
