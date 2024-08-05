import React from "react";
import PropTypes from "prop-types";

import { dateFormat } from "utils";

import {
  StepView,
  Columns,
  MainHeaderBar,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";

const generateTitle = (forename, surname, declarationDate, signatureDate) => {
  const declaration =
    declarationDate !== undefined
      ? ` - Declaration ${dateFormat(declarationDate)}`
      : "";
  const signature =
    signatureDate !== undefined
      ? ` - Signature ${dateFormat(signatureDate)}`
      : "";

  return `${forename} ${surname} ${declaration} ${signature}`;
};

const DeclarationsAndSignaturesItem = ({ individual }) => {
  return (
    <Columns>
      <MainHeaderBar
        title={generateTitle(
          individual?.personal_data?.forename,
          individual?.personal_data?.surname,
          individual?.declarations_signatures?.date_of_declaration,
          individual?.declarations_signatures?.date_of_signature
        )}
      >
        {" "}
      </MainHeaderBar>
    </Columns>
  );
};

const DeclarationsAndSignaturesView = ({ individuals, status, expanded }) => {
  const isExpanded = useExpandForStatus(status, expanded, "New");
  return (
    <StepView
      title="Declarations & Signatures"
      status={status}
      expanded={isExpanded}
    >
      <RenderSectionConditionally status={status}>
        {individuals?.map((individual) => {
          return (
            <DeclarationsAndSignaturesItem
              key={individual.applicant_id}
              individual={individual}
            />
          );
        })}
      </RenderSectionConditionally>
    </StepView>
  );
};

DeclarationsAndSignaturesItem.propTypes = {
  individual: PropTypes.object,
};
DeclarationsAndSignaturesView.propTypes = {
  status: PropTypes.string,
  individuals: PropTypes.array,
  expanded: PropTypes.bool,
};

export default DeclarationsAndSignaturesView;
