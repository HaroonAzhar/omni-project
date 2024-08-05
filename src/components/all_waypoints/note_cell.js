import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PopupNote } from "components/molecules";

const StyledActionButton = styled.button`
  display: inline-flex;
  padding: 0px 10px;
`;

const Dot = styled.span`
  padding-bottom: 0.25em;

  &:before {
    content: "";
    display: block;
    width: 4px;
    height: 4px;
    background: #acafc1;
    border-radius: 100%;
    margin-right: 5px;
  }

  &:last-child:before {
    margin-right: 0;
  }
`;

const NoteCell = ({ row }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const str = row.values.Notes;
  let strDisplayed = row.values.Notes;
  if (str !== undefined && str.length > 100) {
    strDisplayed = `${str.substring(0, 100)}`;
  }

  return (
    <>
      <PopupNote
        isOpen={isPopupOpen}
        title="Full Note"
        desc={str}
        onClose={() => setIsPopupOpen(false)}
      />

      {strDisplayed}
      {str !== undefined && str.length > 100 && (
        <StyledActionButton
          onClick={() => {
            setIsPopupOpen(true);
          }}
        >
          <Dot />
          <Dot />
          <Dot />
        </StyledActionButton>
      )}
    </>
  );
};

NoteCell.propTypes = {
  row: PropTypes.object.isRequired,
};

export default NoteCell;
