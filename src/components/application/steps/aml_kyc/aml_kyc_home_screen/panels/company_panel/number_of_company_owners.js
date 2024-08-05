import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SelectQuestion from "../shared/select_question";

const StyledNumberOfCompanyOwners = styled.div`
  min-width: 400px;
`;
const StyledNumberOfCompanyOwnersContent = styled.div`
  margin-left: 25px;
  margin-top: 15px;
`;

const company_shareholders = {
  name: "company_shareholders",
  referral: (value) => value === false,
};
const individuals_shareholders = {
  name: "individuals_shareholders",
  referral: (value) => value === false,
};

const NumberOfCompanyOwners = ({ applicant, disabled = false }) => {
  const { shared_holders = [] } = applicant;
  const individualSharedHolders = shared_holders.filter(
    (shared_holder) => !shared_holder.isCompany
  );
  const companySharedHolders = shared_holders.filter(
    (shared_holder) => shared_holder.isCompany
  );

  const noCompaniesOwners = companySharedHolders.length;
  const noIndividualOwners = individualSharedHolders.length;

  return (
    <StyledNumberOfCompanyOwners>
      <legend>Number of company owners</legend>
      <StyledNumberOfCompanyOwnersContent>
        {noCompaniesOwners > 0 && (
          <SelectQuestion
            name={company_shareholders.name}
            label={`Companies ${noCompaniesOwners} confirmed`}
            referral={company_shareholders.referral}
            disabled={disabled}
          />
        )}
        {noIndividualOwners > 0 && (
          <SelectQuestion
            name={individuals_shareholders.name}
            label={`Individuals ${noIndividualOwners} confirmed`}
            referral={individuals_shareholders.referral}
            disabled={disabled}
          />
        )}
      </StyledNumberOfCompanyOwnersContent>
    </StyledNumberOfCompanyOwners>
  );
};

export default NumberOfCompanyOwners;

NumberOfCompanyOwners.propTypes = {
  applicant: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

export const numberOfCompanyQuestionsData = [
  company_shareholders,
  individuals_shareholders,
];
