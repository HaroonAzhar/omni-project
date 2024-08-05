import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Field } from "react-final-form";
import * as yup from "yup";
import { OnChange } from "react-final-form-listeners";
import moment from "moment";

import { popUpBasicCss } from "styles/global_blocks";
import { H1, TextInput } from "components/atoms";
import { Table, AutoManualToggle } from "components/molecules";
import validationMessages from "utils/validation_messages";
import { currencyFormat, percentFormat } from "utils";
import { errorColor } from "styles/colors";

import AdvanceInput from "./advance_input";

const StyledWrapper = styled.section`
  ${popUpBasicCss}
  margin-top: 15px;
  min-height: 400px;
  padding: 10px;
  width: 100%;
`;

const StyledFlex = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledField = styled(Field)`
  width: 210px;
`;

const StyledErrorMessage = styled.span`
  color: ${errorColor};
  height: 1em;
`;

const columns = [
  {
    Header: "Month",
    accessor: "month",
  },
  {
    Header: "Start date",
    accessor: "start_date",
  },
  {
    Header: "Advances",
    accessor: "advances",
  },
  {
    Header: "Interest",
    accessor: "interest",
  },
  {
    Header: "End bal.",
    accessor: "end_bal",
  },
  {
    Header: "Gross LTV",
    accessor: "gross_ltv",
  },
  {
    Header: "GDLTV",
    accessor: "gdltv",
  },
];

const dateValidation = (value) => {
  try {
    yup.date().validateSync(value);
  } catch (e) {
    return validationMessages.mustBeDate;
  }
};

const formatAsPercent = (value) =>
  value === "-" ? value : percentFormat(value);
const formatAsCurrency = (value) =>
  value === "-" ? value : currencyFormat(value);

const DrawdownSplitTable = ({
  formValues,
  totalOfFurtherAdvances,
  clearFurtherAdvances,
}) => {
  const { IsManualMode: isManualMode, drawdowns } = formValues;

  const [errorMessage, setErrorMessage] = useState();

  const sumOfFurtherAdvances = (drawdowns || [])
    .slice(1)
    .reduce((acc, drawdown) => acc + (Number(drawdown.advance) || 0), 0);

  const data = (drawdowns || []).map((drawdown, index) => {
    const validate = () => {
      if (!drawdown) return;

      if (
        sumOfFurtherAdvances.toFixed(2) !== (+totalOfFurtherAdvances).toFixed(2)
      ) {
        setErrorMessage(validationMessages.advancesShouldAddUp);
        return " ";
      }

      setErrorMessage();
    };

    const remainingDrawdowns = totalOfFurtherAdvances - sumOfFurtherAdvances;

    const {
      interest = "-",
      end_bal = "-",
      gross_ltv = "-",
      gross_ltgdv: gdltv = "-",
      date,
      advance,
      isEditable = false,
      isShown = false,
    } = drawdown;

    const momentDate = moment(date, "DD/MM/YYYY");

    const furtherAdvancesCell = isEditable ? (
      <AdvanceInput
        name={`furtherAdvances[${index - 1}]`}
        validate={validate}
        remainingDrawdowns={remainingDrawdowns}
      />
    ) : (
      formatAsCurrency(advance)
    );

    return {
      month: momentDate.format("MMMM"),
      start_date: date,
      advances: isShown ? furtherAdvancesCell : undefined,
      interest: formatAsCurrency(interest),
      end_bal: formatAsCurrency(end_bal),
      gross_ltv: formatAsPercent(gross_ltv),
      gdltv: formatAsPercent(gdltv),
    };
  });

  const clearAdvances = () => {
    setErrorMessage();
    clearFurtherAdvances();
  };

  return (
    <StyledWrapper>
      <header>
        <H1>Drawdown split</H1>

        <StyledFlex>
          <StyledField
            component={TextInput}
            type="date"
            name="StartDate"
            label="Start Date"
            placeholder="10/10/2020"
            validate={(value) => dateValidation(value)}
          />

          <AutoManualToggle
            label="Manual mode"
            name="IsManualMode"
            checked={isManualMode}
          />
          <OnChange name="IsManualMode">{clearAdvances}</OnChange>
        </StyledFlex>
        {errorMessage && (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        )}
      </header>

      <Table
        kind={{ type: "drawdown_split" }}
        columns={columns}
        data={data}
        shouldShowHeaders={true}
      />
    </StyledWrapper>
  );
};

DrawdownSplitTable.propTypes = {
  formValues: PropTypes.object.isRequired,
  totalOfFurtherAdvances: PropTypes.number.isRequired,
  clearFurtherAdvances: PropTypes.func.isRequired,
};

export default DrawdownSplitTable;
