import moment from "moment";

import { prepareApplicationDataForReduxStore } from "utils";
import getStatementInput from "components/completed/steps/cashflows/view_cashflows/get_statement_input";
import signedAmount from "components/completed/steps/adjustments/helpers/signed_amount";

import {
  getApplication,
  getApplicant,
  getAdminRecord,
  getAdjustments,
  getCase,
  getDefaultEventsPeriods,
} from "../api";
import getBase64 from "./get_base64";
import { statement } from "../calculator";

const MINIMUM_INTEREST_MONTHS = 3;

const getEndDateIncludingMinimumInterest = (completed) =>
  moment(completed?.DateOfCompletion ?? new Date())
    .add(MINIMUM_INTEREST_MONTHS, "months")
    .subtract(1, "day");

export const enrich = async (baseData, ...functions) =>
  functions.reduce(async (data, next) => next(await data), baseData);

export const withApplicationAndCalculator = async (existingData) => {
  const { id } = existingData;
  const caseResponse = await getApplication(id);
  const applicantsResponse = await getApplicant(id);
  const { individuals, company } = applicantsResponse.data.attributes;
  const { application, calculator } = prepareApplicationDataForReduxStore(
    caseResponse.data.attributes.application
  );
  const underwriterId = application.summary?.overview?.underwriter;
  if (underwriterId) {
    const underwriterResponse = await getAdminRecord(
      "underwriters",
      underwriterId
    );
    application.underwriter = underwriterResponse.data;
  }
  application.individuals = individuals;
  application.company = company;
  return {
    ...existingData,
    application,
    calculator,
  };
};

export const withStatementData = async (existingData) => {
  const {
    id,
    endDate = new Date(),
    shouldUseMaturityDate = false,
    withMinimumInterest = false,
  } = existingData;

  const adjustmentsData = await getAdjustments(id);
  const { data: defaultEventsPeriods } = await getDefaultEventsPeriods(id);

  const adjustments = adjustmentsData.data.map((adjustment) => ({
    ...adjustment,
    signedAmount: signedAmount(adjustment, adjustment.amount),
  }));
  const {
    data: { dip: dipData, completed },
  } = await getCase(existingData.id);

  const effectiveEndDate = shouldUseMaturityDate
    ? completed.currentDateOfMaturity
    : endDate;

  const minimumInterestIncludingDate = withMinimumInterest
    ? getEndDateIncludingMinimumInterest(completed)
    : effectiveEndDate;

  const latestDate = moment(effectiveEndDate).isAfter(
    minimumInterestIncludingDate
  )
    ? effectiveEndDate
    : minimumInterestIncludingDate;

  const statementInputRedemption = getStatementInput({
    dip: dipData,
    completed,
    adjustments,
    defaultEventsPeriods,
    endDate: latestDate,
  });
  const statementResultRedemption = await statement(statementInputRedemption);

  completed.defaultEventsPeriods = defaultEventsPeriods;
  completed.reportDate = effectiveEndDate;

  return {
    ...existingData,
    adjustments,
    completed,
    statementResults: statementResultRedemption,
  };
};

export const withBase64Template = async (existingData) => {
  const { base64Url } = existingData;
  const base64Template = await getBase64(base64Url);
  return {
    ...existingData,
    base64Template,
  };
};
