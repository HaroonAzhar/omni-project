import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "components/atoms";
import { useOutsideClick } from "utils";
import { QuillEditor } from "components/molecules";

import useSaveFormOnChangePath from "./use_save_form_on_change_path";
import ContextMenu from "../context_menu";

const StyledContextMenu = styled(ContextMenu)`
  margin-left: 25px;
  margin-top: -30px;
  overflow: hidden;
  position: absolute;
`;

const StyledSaveButton = styled(Button)`
  margin-top: 20px;
  min-width: 100px;
  width: 100px;
`;

const StyledEditorWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`;

const TextEditor = ({
  onSubmit,
  state,
  shouldSaveOnChangePath = true,
  contextMenu = true,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [editorContent, setEditorContent] = useState(state || "");
  const [isPristine, setIsPristine] = useState(true);

  useSaveFormOnChangePath({
    shouldSave: shouldSaveOnChangePath && !isPristine,
    data: editorContent,
    onSubmit,
  });

  const onChange = (content) => {
    setEditorContent(content);

    if (state !== content) {
      setIsPristine(false);
    }
  };

  useEffect(() => {
    if (state) {
      setEditorContent(state);
    }
  }, [state]);
  const ref = useRef();

  useOutsideClick(ref, () => {
    setIsFocused(false);
  });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(editorContent);
  };

  return (
    <StyledEditorWrapper ref={ref}>
      {contextMenu && isFocused && <StyledContextMenu />}

      <QuillEditor
        value={editorContent}
        onChange={onChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        readOnly={disabled}
      />

      {!disabled && isFocused && (
        <StyledSaveButton onClick={submit}>Save</StyledSaveButton>
      )}
    </StyledEditorWrapper>
  );
};

TextEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  shouldSaveOnChangePath: PropTypes.bool,
  contextMenu: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TextEditor;
