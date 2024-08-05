import React from "react";
import PropTypes from "prop-types";

import { ProofOfRightToRemainQuestion } from "./questions";
import { ReferralQuestionsMapper } from "../shared/referral";

const questionData = [ProofOfRightToRemainQuestion];

const lastOption = { value: "not supplied", label: "Not Supplied" };
const firstOptions = [
  { value: "", label: "Choose one" },
  {
    value: "proof of indefinite leave to remain",
    label: "Proof Of Indefinite Leave To Remain",
  },
];

const irishOnlyOptions = [
  {
    value: "irish citizen",
    label: "Irish Citizen",
  },
];
const eeaOnlyOptions = [
  {
    value: "proof of settled status",
    label: "Proof of Settled Status",
  },
];

const getOptionsForNationality = (applicant = {}) => {
  return [
    ...firstOptions,
    ...(applicant.isIndividualFromEeaSwiss ? eeaOnlyOptions : []),
    ...(applicant.isIndividualFromIreland ? irishOnlyOptions : []),

    lastOption,
  ];
};

const ProofOfRightToRemain = ({ applicant, disabled = false }) => {
  questionData[0].options = getOptionsForNationality(applicant);

  return (
    <>
      <ReferralQuestionsMapper
        questionData={questionData}
        disabled={disabled}
      />
    </>
  );
};

export const individualFieldsReferralProof = questionData.reduce(
  (acc, field) => ({
    ...acc,
    [field.name]: field,
  }),
  {}
);

export default ProofOfRightToRemain;

ProofOfRightToRemain.propTypes = {
  applicant: PropTypes.object,
  disabled: PropTypes.bool,
};
