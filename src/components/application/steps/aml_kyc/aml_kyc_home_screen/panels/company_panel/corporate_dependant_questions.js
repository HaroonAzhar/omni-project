import React from "react";
import PropTypes from "prop-types";

import SelectQuestion from "../shared/select_question";
import {
  ReferralTextField,
  ReferralSelectField,
  ReferralIntegerField,
  ReferralQuestionsMapper,
} from "../shared/referral";
import {
  evidenceOfTradingAddressOptions,
  partnershipAgreementOptions,
  verificationDocumentsOptions,
  trustOptions,
} from "../shared/options";

export const verification_company_is_subsidiary = {
  name: "verification_company_is_subsidiary",
  label: "Verification Company is a Subsidiary",
  component: SelectQuestion,
};
export const evidence_of_authority_to_act_for_firm = {
  name: "evidence_of_authority_to_act_for_firm",
  label: "Evidence of Authority to Act for Firm",
  component: SelectQuestion,
};

export const verified_as_individual = {
  name: "partner_verified_as_individual",
  label: "Verified as Individual",
  component: SelectQuestion,
};

export const sedol_no_exchange = {
  name: "sedol_no_exchange",
  label: "SEDOL # & Exchange",
  component: ReferralTextField,
};

export const evidence_of_trading_address = {
  name: "evidence_of_trading_address",
  label: "Evidence of Trading Address",
  options: evidenceOfTradingAddressOptions,
  component: ReferralSelectField,
};
export const purpose_of_partnership = {
  name: "purpose_of_partnership",
  label: "Purpose of Partnership",
  component: ReferralTextField,
};

export const number_of_individuals = {
  name: "number_of_individuals",
  label: "Number of Individuals",
  component: ReferralIntegerField,
};

const whenNo = (value) => value === false;

export const icaew_membership_confirmed = {
  name: "icaew_membership_confirmed",
  label: "ICAEW Membership Confirmed",
  component: SelectQuestion,
  referral: whenNo,
};

export const law_society_membership_confirmed = {
  name: "law_society_membership_confirmed",
  label: "Law Society Membership Confirmed",
  component: SelectQuestion,
  referral: whenNo,
};

export const settlor_type = {
  name: "settlor_type",
  label: "Settlor Type",
  options: trustOptions,
  component: ReferralSelectField,
};

export const trustee_type = {
  name: "trustee_type",
  label: "Trustee Type",
  options: trustOptions,
  component: ReferralSelectField,
};

export const controller_type = {
  name: "controller_type",
  label: "Controller Type",
  options: trustOptions,
  component: ReferralSelectField,
};

export const source_of_funds_confirmed = {
  name: "source_of_funds_confirmed",
  label: "Source of Funds confirmed",
  component: SelectQuestion,
};

export const certificate_of_incorporation = {
  name: "certificate_of_incorporation",
  label: "Certificate of Incorporation / Trade on File",
  component: SelectQuestion,
  referral: whenNo,
};

export const list_of_shareholders = {
  name: "list_of_shareholders",
  label: "List of Shareholders/Directors on File",
  component: SelectQuestion,
  referral: whenNo,
};

export const verification_documents_on_file = {
  name: "verification_documents_on_file",
  label: "Verification Documents on File",
  options: verificationDocumentsOptions,
  component: ReferralSelectField,
};

export const shareholders_verified_as_individual = {
  name: "shareholders_verified_as_individual",
  label: "Each Shareholder of 25%+ Verified as Individual",
  component: SelectQuestion,
  referral: whenNo,
};

export const person_with_control_verified_as_individual = {
  name: "person_with_control_verified_as_individual",
  label: "Each Person with Control Verified as Individual",
  component: SelectQuestion,
  referral: whenNo,
};

export const person_with_interest_verified_as_individual = {
  name: "person_with_interest_verified_as_individual",
  label: "Each Person with Beneficial Interest of 25%+ Verified as Individual",
  component: SelectQuestion,
  referral: whenNo,
};

export const partner_verified_as_individual = {
  name: "partner_verified_as_individual",
  label: "Each Partner/Beneficial Owner Verified as Individual",
  component: SelectQuestion,
  referral: whenNo,
};

export const partnership_agreement_on_file = {
  name: "partnership_agreement_on_file",
  label: "Partnership Agreement on File",
  options: partnershipAgreementOptions,
  component: ReferralSelectField,
  referral: (value) => value === "no",
};

const questionsDataFor = {
  "subsidiary of public registered company": [
    verification_company_is_subsidiary,
    sedol_no_exchange,
    evidence_of_authority_to_act_for_firm,
    verified_as_individual,
  ],
  "public registered company": [
    sedol_no_exchange,
    evidence_of_authority_to_act_for_firm,
    verified_as_individual,
  ],
  "partnership / unincorporated business": [
    evidence_of_trading_address,
    purpose_of_partnership,
    partnership_agreement_on_file,
    number_of_individuals,
    partner_verified_as_individual,
    person_with_control_verified_as_individual,
  ],
  "private company": [
    certificate_of_incorporation,
    list_of_shareholders,
    verification_documents_on_file,
    number_of_individuals,
    shareholders_verified_as_individual,
    person_with_control_verified_as_individual,
    person_with_interest_verified_as_individual,
  ],
  lawyer: [law_society_membership_confirmed, number_of_individuals],
  accountant: [icaew_membership_confirmed, number_of_individuals],
  trust: [
    settlor_type,
    trustee_type,
    controller_type,
    source_of_funds_confirmed,
  ],
};

const CorporateDependantQuestions = ({
  corporate_structure,
  disabled = false,
}) => {
  const questionData = questionsDataFor[corporate_structure] || [];

  return (
    <ReferralQuestionsMapper questionData={questionData} disabled={disabled} />
  );
};

export default CorporateDependantQuestions;

CorporateDependantQuestions.propTypes = {
  corporate_structure: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export const corporateDependantQuestionsData = Object.values(
  questionsDataFor
).reduce((acc, questionsData) => [...acc, ...questionsData]);
