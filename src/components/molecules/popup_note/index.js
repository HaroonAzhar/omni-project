import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Modal } from "components/atoms";
import { darkGrey } from "styles/colors";

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 235px;
  justify-content: center;
  text-align: center;
  width: 475px;
`;

const StyledTitle = styled.h1`
  color: ${darkGrey};
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledDesc = styled.div`
  height: 175px;
  margin: 0px;
  overflow-y: scroll;
  padding: 0px 10px 0px 0px;
  text-align: left;

  p {
    line-height: 18px;
    margin-bottom: 10px;
  }
`;

const PopupNote = ({ title, desc, isOpen, onClose }) => {
  const regex = /,,/g;
  let txtArray;
  let txtFormatted;

  function createMarkup() {
    return { __html: txtFormatted };
  }

  if (desc !== undefined) {
    txtArray = desc.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/);
    txtFormatted = txtArray
      .join()
      .replace(regex, "</p><p>")
      .replace(/^/, "<p>")
      .replace(/$/, "</p>");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledDiv>
        <StyledTitle>{title}</StyledTitle>

        <StyledDesc dangerouslySetInnerHTML={createMarkup()}></StyledDesc>
      </StyledDiv>
    </Modal>
  );
};

export default PopupNote;

PopupNote.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
