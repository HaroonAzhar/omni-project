import React from "react";
import PropTypes from "prop-types";
import { titleize } from "inflected";

import { escapeTitlize, dateFormat, mapBooleanFieldToString } from "utils";

import {
  StepView,
  Columns,
  Rows,
  Column,
  ViewRowLeftRight,
  ViewRowMulti,
  RenderSectionConditionally,
} from "../shared";
import { useExpandForStatus } from "./hooks";
import { LabelStyle } from "../shared/shared_styles";

const isNonUk = (type) => {
  if (type === "nonuk") {
    return true;
  }
};
const isIndividual = (isCompany) => {
  if (isCompany) {
    return true;
  }
};
const arrivalInUk = (arrival) => {
  if (arrival === undefined) {
    return null;
  } else if (arrival === true) {
    return <span>&gt; 3 months</span>;
  } else if (arrival === false) {
    return <span>&lt; 3 months</span>;
  }
};

const getMlroString = (amlKyc) => ([field, okValueCheck]) => {
  if (okValueCheck(amlKyc?.[field])) {
    return "";
  }
  const mlroDate = amlKyc?.[`${field}_mlro_date`];
  const mlroSignatureInfo =
    (mlroDate &&
      ` ${dateFormat(mlroDate)} ${amlKyc?.[`${field}_mlro_username`]}`) ??
    "";
  return `${titleize(field)} MLRO ${mlroSignatureInfo}`;
};
const mlroSignOff = (amlKyc) => {
  const fields = [
    ["creditsafe", (val) => val !== false],
    ["creditsafe_clear", (val) => val !== false],
    ["is_pep", (val) => val !== true],
    ["any_suspicion_of_money_laundering", (val) => val !== true],
    ["links_to_high_risk_jurisdiction", (val) => (val ?? "n/a") === "n/a"],
  ];
  return fields.map(getMlroString(amlKyc));
};
const AmlKycItemColLeft = ({ individual, type }) => {
  return (
    <Column>
      {isIndividual(!individual?.isCompany) ? (
        <>
          <ViewRowLeftRight
            title="Proof of ID:"
            value={escapeTitlize(individual?.aml_kyc?.proof_of_id)}
          />
          <ViewRowLeftRight
            title="Proof of Address:"
            value={escapeTitlize(individual?.aml_kyc?.proof_of_address)}
          />

          {isNonUk(type) ? (
            <>
              {individual?.aml_kyc?.proof_of_address ===
              "BANK_STATEMENT" ? null : (
                <ViewRowLeftRight
                  title="Additional Proof:"
                  value={individual?.aml_kyc?.additional_proof_of_address}
                />
              )}
              <ViewRowLeftRight
                title="Arrival in UK:"
                value={arrivalInUk(individual?.aml_kyc?.client_arrival_in_uk)}
              />
              <ViewRowLeftRight
                title="3rd Party Verification:"
                value={mapBooleanFieldToString(
                  individual?.aml_kyc?.third_party_verification
                )}
              />
            </>
          ) : null}
        </>
      ) : (
        <>
          <ViewRowLeftRight
            title="Credit Safe Report Produced?"
            value={mapBooleanFieldToString(individual?.aml_kyc?.creditsafe)}
          />
          <ViewRowLeftRight
            title="Credit Safe Report Clear?"
            value={mapBooleanFieldToString(
              individual?.aml_kyc?.creditsafe_clear
            )}
          />
          <ViewRowLeftRight
            title="Any Suspicion of Money Laundering Activities?"
            value={mapBooleanFieldToString(
              individual?.aml_kyc?.any_suspicion_of_money_laundering
            )}
          />
        </>
      )}

      {individual?.aml_kyc?.additional_notes !== undefined && (
        <ViewRowLeftRight
          title="Notes:"
          value={individual?.aml_kyc?.additional_notes}
        />
      )}
      {individual?.aml_kyc?.status?.includes("referral") && (
        <ViewRowMulti
          title="MLRO Sign-off:"
          value={mlroSignOff(individual?.aml_kyc)}
        />
      )}
    </Column>
  );
};

const CompanyOwnersTable = ({
  is_individual_owner,
  is_company_owner,
  shared_holders,
}) => {
  const companyOwnersIndividuals = shared_holders?.filter((owner) => {
    return owner.isCompany === false;
  });

  const companyOwnersCompanies = shared_holders?.filter((owner) => {
    return owner.isCompany === true;
  });

  return (
    <>
      <LabelStyle>Number of Company Owners Confirmed?</LabelStyle>

      {companyOwnersIndividuals.length > 0 && (
        <ViewRowLeftRight
          title={`[${companyOwnersIndividuals.length}] Individuals`}
          value={mapBooleanFieldToString(is_individual_owner)}
        />
      )}
      {companyOwnersCompanies.length > 0 && (
        <ViewRowLeftRight
          title={`[${companyOwnersCompanies.length}] Companies`}
          value={mapBooleanFieldToString(is_company_owner)}
        />
      )}
    </>
  );
};

const AmlKycItemColRight = ({ individual, shared_holders }) => {
  const isCompanyOwner = () => {
    if (individual?.aml_kyc?.company_shareholders === undefined) {
      return false;
    } else if (individual?.aml_kyc?.company_shareholders !== undefined) {
      return true;
    }
  };

  const isIndividualOwner = () => {
    if (individual?.aml_kyc?.individuals_shareholders === undefined) {
      return false;
    } else if (individual?.aml_kyc?.individuals_shareholders !== undefined) {
      return true;
    }
  };

  return (
    <Column>
      {isIndividual(!individual?.isCompany) ? (
        <>
          <ViewRowLeftRight
            title="Credit Safe Report Produced?"
            value={mapBooleanFieldToString(individual?.aml_kyc?.creditsafe)}
          />
          <ViewRowLeftRight
            title="Credit Safe Report Clear?"
            value={mapBooleanFieldToString(
              individual?.aml_kyc?.creditsafe_clear
            )}
          />
          <ViewRowLeftRight
            title="Individual PEP Match?"
            value={mapBooleanFieldToString(individual?.aml_kyc?.is_pep)}
          />
          <ViewRowLeftRight
            title="Any Links to High-Risk Jurisdictions?"
            value={escapeTitlize(
              individual?.aml_kyc?.links_to_high_risk_jurisdiction
            )}
          />
          <ViewRowLeftRight
            title="Any Suspicion of Money Laundering Activities?"
            value={mapBooleanFieldToString(
              individual?.aml_kyc?.any_suspicion_of_money_laundering
            )}
          />
        </>
      ) : (
        <>
          <CompanyOwnersTable
            is_individual_owner={isIndividualOwner()}
            is_company_owner={isCompanyOwner()}
            shared_holders={shared_holders}
          />
        </>
      )}
    </Column>
  );
};

const AmlKycItem = ({
  individual,
  type,
  expanded,
  shared_holders,
  company_shareholders,
  individuals_shareholders,
}) => {
  const amlKycStatusDefault = (isStatus) => isStatus ?? "New";

  const isExpanded = useExpandForStatus(
    amlKycStatusDefault(individual?.aml_kyc?.status),
    expanded,
    "New"
  );

  return (
    <Columns>
      <StepView
        title={`${escapeTitlize(individual?.label)}`}
        status={amlKycStatusDefault(individual?.aml_kyc?.status)}
        expanded={isExpanded}
      >
        <RenderSectionConditionally
          status={amlKycStatusDefault(individual?.aml_kyc?.status)}
        >
          <Rows>
            <AmlKycItemColLeft individual={individual} type={type} />
            <AmlKycItemColRight
              individual={individual}
              type={type}
              shared_holders={shared_holders}
              company_shareholders={company_shareholders}
              individuals_shareholders={individuals_shareholders}
            />
          </Rows>
        </RenderSectionConditionally>
      </StepView>
    </Columns>
  );
};

const AmlKycView = ({ companies, applicants, status, expanded }) => {
  const applicantStatus = applicants?.filter((applicant) => {
    return applicant?.aml_kyc?.status === undefined;
  }).length;

  const isExpanded = useExpandForStatus(
    applicants?.length === applicantStatus ? "New" : status,
    expanded,
    "New"
  );

  return (
    <StepView
      title="AML/KYC"
      status={applicants?.length === applicantStatus ? "New" : status}
      expanded={isExpanded}
    >
      <LabelStyle>
        Uk Individuals (
        {
          applicants.filter((applicant) => {
            return applicant?.isIndividualFromUK === true;
          }).length
        }
        )
      </LabelStyle>

      {applicants
        .filter((applicant) => {
          return applicant?.isIndividualFromUK === true;
        })
        .map((applicant) => {
          return (
            <AmlKycItem
              key={applicant?.individual_id}
              individual={applicant}
              type="uk"
              expanded={expanded}
            />
          );
        })}

      <LabelStyle>
        Non Uk Individuals (
        {
          applicants.filter((applicant) => {
            return applicant.isIndividualFromUK === false;
          }).length
        }
        )
      </LabelStyle>

      {applicants
        .filter((applicant) => {
          return applicant.isIndividualFromUK === false;
        })
        .map((applicant) => {
          return (
            <AmlKycItem
              key={applicant.individual_id}
              individual={applicant}
              type="nonuk"
              expanded={expanded}
            />
          );
        })}

      <LabelStyle>
        Company (
        {
          applicants.filter((applicant) => {
            return applicant.isCompany === true;
          }).length
        }
        )
      </LabelStyle>
      {applicants
        .filter((applicant) => {
          return applicant.isCompany === true;
        })
        .map((applicant) => {
          return (
            <AmlKycItem
              key={applicant?.individual_id}
              individual={applicant}
              type="co"
              shared_holders={applicant?.shared_holders}
              expanded={expanded}
              company_shareholders={companies?.aml_kyc?.company_shareholders}
              individuals_shareholders={
                companies?.aml_kyc?.individuals_shareholders
              }
            />
          );
        })}
    </StepView>
  );
};

AmlKycItem.propTypes = {
  individual: PropTypes.object,
  type: PropTypes.string,
  expanded: PropTypes.bool,
  company_shareholders: PropTypes.bool,
  individuals_shareholders: PropTypes.bool,
  shared_holders: PropTypes.array,
};
AmlKycItemColLeft.propTypes = {
  individual: PropTypes.object,
  type: PropTypes.string,
};
AmlKycItemColRight.propTypes = {
  individual: PropTypes.object,
  shared_holders: PropTypes.array,
};
AmlKycView.propTypes = {
  companies: PropTypes.object,
  status: PropTypes.string,
  applicants: PropTypes.array,
  expanded: PropTypes.bool,
};

CompanyOwnersTable.propTypes = {
  shared_holders: PropTypes.array,
  is_individual_owner: PropTypes.bool,
  is_company_owner: PropTypes.bool,
};

export default AmlKycView;
