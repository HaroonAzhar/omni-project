import React from "react";
import PropTypes from "prop-types";

import { StyledInputContainer } from "../../case_summary_styles";
import { StyledTable } from "./styled_valuation_form";

const surveyorColumns = [
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Surveyor Firm",
    accessor: "surveyor",
  },
  {
    Header: "Surveyor Individual Name",
    accessor: "surveyor_name",
  },
];

const Surveyor = ({ properties }) => {
  const surveyorData = properties.map(({ valuation_report }, index) => ({
    address: index + 1,
    surveyor: valuation_report.surveyor,
    surveyor_name: valuation_report.name_of_the_individual_surveyor,
  }));

  return (
    <StyledInputContainer>
      <StyledTable
        columns={surveyorColumns}
        data={surveyorData}
        shouldShowHeaders={true}
      />
    </StyledInputContainer>
  );
};

Surveyor.propTypes = {
  properties: PropTypes.array.isRequired,
};

export default Surveyor;
