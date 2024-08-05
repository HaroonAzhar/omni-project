import React, { useState } from "react";
import PropTypes from "prop-types";
import { OnFocus, OnBlur } from "react-final-form-listeners";
import styled from "styled-components";

import { PriceField } from "components/atoms";
import { currencyFormat } from "utils";
import { ReactComponent as InfoIcon } from "images/icons/info.svg";
import { popUpBasicCss } from "styles/global_blocks";
import { alwaysOnTop } from "styles/z_indexes";

const StyledToolTip = styled.div`
  background: white;
  padding: 7px 10px;
  position: absolute;
  right: 0;
  text-align: left;
  top: 46px;
  white-space: nowrap;
  ${popUpBasicCss};
  z-index: ${alwaysOnTop};
`;

const StyledInfoBoxText = styled.span`
  padding-left: 10px;
  position: relative;
  top: -0.5em;
`;

const StyledPriceField = styled(PriceField)`
  width: 90px;

  & input + span {
    /* Hide error message */
    display: none;
  }
`;

const AdvanceInput = ({ name, validate, remainingDrawdowns }) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  return (
    <>
      <StyledPriceField
        type="text"
        name={name}
        placeholder="£0,00.00"
        validate={validate}
      />
      <OnFocus name={name}>{() => setIsToolTipVisible(true)}</OnFocus>
      <OnBlur name={name}>{() => setIsToolTipVisible(false)}</OnBlur>
      {isToolTipVisible && (
        <StyledToolTip>
          <InfoIcon />
          <StyledInfoBoxText>
            {`Remaining drawdown: ${currencyFormat(remainingDrawdowns)}`}
          </StyledInfoBoxText>
        </StyledToolTip>
      )}
    </>
  );
};

AdvanceInput.propTypes = {
  name: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  remainingDrawdowns: PropTypes.number.isRequired,
};

export default AdvanceInput;
