import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { H1 } from "components/atoms";
import { saveSecurityOverviewState } from "store/application/actions";
import { TextEditor } from "components/molecules";
import { currencyFormat } from "utils";
import {
  getValuerNameFromSecurity,
  getAnalysisOfPropertyFromSecurity,
  getPropertiesOfApplication,
} from "components/case_summary/selectors";

import ValuerNameInput from "./valuer_name_input";
import { StyledLabel, useSubmitCaseSummary } from "../shared";
import {
  StyledSummarySection,
  StyledFormHeader,
  StyledInputContainer,
} from "../../case_summary_styles";
import Surveyor from "./surveyor";
import { StyledTable } from "./styled_valuation_form";

const columns = [
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "OMV 90 Day",
    accessor: "omv_90_day",
  },
  {
    Header: "GDV",
    accessor: "gdv",
  },
  {
    Header: "OMV",
    accessor: "omv",
  },
  {
    Header: "Inspection Date",
    accessor: "inspection_date",
  },
  {
    Header: "Gross LTV",
    accessor: "gross_ltv",
  },
  {
    Header: "Purchase Price",
    accessor: "purchase_price",
  },
];

const ValuationsForm = () => {
  const dispatch = useDispatch();
  const properties = useSelector(getPropertiesOfApplication);
  const analysis_of_property = useSelector(getAnalysisOfPropertyFromSecurity);
  const valuer_name = useSelector(getValuerNameFromSecurity);

  const submit = useSubmitCaseSummary();

  const getOnSubmitFunction = (name) => (text) => {
    const dataToSave = { [name]: text };
    dispatch(saveSecurityOverviewState(dataToSave));
    submit("security", dataToSave);
  };

  const sumOfColumn = {
    omv: 0,
    omv_90_day: 0,
    gdv: 0,
    purchase_price: 0,
  };

  const tableData = properties.map(({ details, valuation_report }, index) => {
    sumOfColumn.omv += Number(valuation_report.market_value) || 0;
    sumOfColumn.omv_90_day += Number(valuation_report.day_value) || 0;
    sumOfColumn.gdv += Number(valuation_report.gdv) || 0;
    sumOfColumn.purchase_price += Number(details.purchase_price) || 0;

    return {
      address: index + 1,
      omv: currencyFormat(valuation_report.market_value || 0),
      omv_90_day: currencyFormat(valuation_report.day_value || 0),
      gdv: currencyFormat(valuation_report.gdv || 0),
      inspection_date: valuation_report.inspection_date,
      gross_ltv: "-",
      purchase_price: currencyFormat(details.purchase_price || 0),
    };
  });

  const sumOfValues = {
    omv: currencyFormat(sumOfColumn.omv),
    omv_90_day: currencyFormat(sumOfColumn.omv_90_day),
    gdv: currencyFormat(sumOfColumn.gdv),
    gross_ltv: "-",
    purchase_price: currencyFormat(sumOfColumn.purchase_price),
  };

  return (
    <StyledSummarySection>
      <StyledFormHeader>
        <H1>Valuations</H1>
      </StyledFormHeader>

      <StyledInputContainer>
        <StyledTable
          columns={columns}
          data={[...tableData, sumOfValues]}
          shouldShowHeaders={true}
        />
      </StyledInputContainer>

      <Surveyor properties={properties} />
      <StyledInputContainer>
        <ValuerNameInput
          initialState={{ valuer_name }}
          name="valuer_name"
          save={(data) => getOnSubmitFunction("valuer_name")(data.valuer_name)}
        />
        <>
          <StyledLabel>
            Analysis of Property (including review of comparable evidence,
            risks, mitigations, planning details, tenant)
          </StyledLabel>
          <TextEditor
            onSubmit={getOnSubmitFunction("analysis_of_property")}
            state={analysis_of_property}
          />
        </>
      </StyledInputContainer>
    </StyledSummarySection>
  );
};

export default ValuationsForm;
