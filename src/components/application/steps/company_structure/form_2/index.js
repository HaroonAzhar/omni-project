/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { Button } from "components/atoms";
import {
  StyledToggleWrapper,
  StyledCheckbox,
  StyledToggle,
} from "components/molecules/auto_manual_toggle";
import { StyledButtonsContainer } from "components/dip_forms_steps/styled_dip_steps";

import buildRowsForTree from "./helpers/buildRowsForTree";
import buildRowsForPercents from "./helpers/buildRowsForPercents";
import accumulateByName from "./helpers/accumulateByName";
import {
  StyledHeld,
  StyledLine,
  StyledName,
  StyledRow,
  StyledWrap,
  StyledLabelSpan,
  StyledColumn,
  StyledToggleLocalContainer,
} from "./styled_form_2";
import { getCompany } from "../../../helpers/company_data_selector";

const Row = ({ data }) => {
  const value = data.held * 100;
  const lines = data.lines.slice(1);

  return (
    <StyledRow>
      <StyledColumn>
        {lines.map((line) => {
          return <StyledLine type={line} />;
        })}

        <StyledWrap>
          <StyledName>{data.name}</StyledName>
        </StyledWrap>
      </StyledColumn>
      <StyledWrap>
        <StyledHeld>{value.toFixed(2)} %</StyledHeld>
      </StyledWrap>
    </StyledRow>
  );
};

const Form2 = ({ finalizeStep, goStepBack }) => {
  const { shared_holders } = useSelector(getCompany);
  const [isTree, setIsTree] = useState(true);

  const rows = useMemo(() => {
    if (isTree) {
      return buildRowsForTree(shared_holders);
    }

    return accumulateByName(buildRowsForPercents(shared_holders));
  }, [isTree, shared_holders]);

  return (
    <>
      <StyledToggleLocalContainer>
        <StyledToggleWrapper
          checked={isTree}
          onClick={() => {
            setIsTree(!isTree);
          }}
        >
          <StyledLabelSpan>% mode</StyledLabelSpan>
          <StyledCheckbox type="checkbox" checked={isTree} />
          <StyledToggle />
          <StyledLabelSpan>Hierarchy</StyledLabelSpan>
        </StyledToggleWrapper>
      </StyledToggleLocalContainer>
      {rows.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={index} data={row} />
      ))}
      <StyledButtonsContainer>
        <Button kind="fade" type="button" onClick={goStepBack}>
          Back
        </Button>

        <Button type="button" onClick={finalizeStep}>
          Continue
        </Button>
      </StyledButtonsContainer>
    </>
  );
};

export default Form2;

Form2.propTypes = {
  finalizeStep: PropTypes.func.isRequired,
  goStepBack: PropTypes.func.isRequired,
};
