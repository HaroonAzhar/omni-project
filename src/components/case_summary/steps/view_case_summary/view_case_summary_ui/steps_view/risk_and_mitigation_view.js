import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { Table } from "components/molecules";

import { RISK_AND_MITIGATION } from "../../../../case_summary_steps";
import { RichTextContent, StepView, Columns, Column } from "../shared";

const columns = [
  {
    Header: `Risk`,
    accessor: "risk",
  },
  {
    Header: "Mitigation",
    accessor: "mitigation",
  },
];
const RiskAndMitigationView = ({ riskInputs = [], underwriterRationale }) => {
  return (
    <StepView
      title={`${titleize(RISK_AND_MITIGATION)} (${(riskInputs ?? []).length})`}
    >
      <Columns>
        <Column>
          <Table
            columns={columns}
            data={riskInputs ?? []}
            shouldShowHeaders={true}
          />
        </Column>
        <Column>
          <RichTextContent title="Underwriter Rationale">
            {underwriterRationale}
          </RichTextContent>
        </Column>
      </Columns>
    </StepView>
  );
};

RiskAndMitigationView.propTypes = {
  underwriterRationale: PropTypes.string,
  riskInputs: PropTypes.array,
};

export default RiskAndMitigationView;
