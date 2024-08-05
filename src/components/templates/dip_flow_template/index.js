import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { capitalize, useRequestWithProgressToastRollbar } from "utils";
import { createCaseReference, getCase } from "utils/requests";
import { H1 } from "components/atoms";
import {
  TypeOfApplicantForm,
  TypeOfLoanForm,
  SecurityDetailsForm,
  LoanPropertyTypeForm,
  LoanDetailsForm,
  FinancialDetailsForm,
  IntroducerDetailsForm,
  FinancialDetailsCalculator,
  ApplicantDetailsFork,
  SummaryStep,
  DipSummary,
} from "components/dip_forms_steps";
import { FinalPopup } from "components/molecules";
import { insertDipData, updateDipData } from "store/dip";
import { updateCaseNumber } from "store/case";
import useCaseData from "hooks/use_case_data";
import {
  saveDipIntroducer,
  saveDipBrokerDetails,
  saveDipAdvanceType,
  saveDipContactCompany,
  saveDipContactIndividual,
  saveDipBuildingType,
  saveDipSecurities,
  saveDipLoanDetails,
  saveDipFinancialDetails,
  saveDipFinancialCalculatorDetails,
  saveDip,
} from "utils/requests/api";

import StepsListMenu from "./steps_list_menu";
import {
  StyledDipContainer,
  StyledFormColumn,
  StyledStep,
  StyledInfoBox,
  DipWrapper,
} from "./styled_dip_flow";
import {
  INTRODUCER_DETAILS,
  TYPE_OF_LOAN,
  TYPE_OF_APPLICANT,
  APPLICANT_DETAILS,
  SECURITY_DETAILS,
  LOAN_DETAILS,
  FINANCIAL_DETAILS,
  FINANCIAL_DETAILS_SUMMARY,
  DIP_SUMMARY,
  namesOrder,
  stepsWithNames,
} from "./steps_names";

let calculatorCache = {};
const cacheCalculatorData = (data) => {
  calculatorCache = data;
};

const useRequestWithId = (requestFunction) => {
  const { id } = useParams();
  const request = useRequestWithProgressToastRollbar(requestFunction);

  const callback = useCallback((...args) => request(...args, id), [
    id,
    request,
  ]);
  return callback;
};

const useStorePreApplication = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const request = useCallback(() => {
    getCase(id).then(({ data }) => {
      const { dip } = data;
      dispatch(insertDipData({ dip }));
    });
  }, [dispatch, id]);
  useEffect(request, [request]);

  return request;
};

const DipFlow = ({ canSkipAddressValidation, caseStage, skipGeneratePdf }) => {
  const { id, indexOfStep = 0 } = useParams();
  const history = useHistory();
  const currentStepIndex = +indexOfStep;
  const [isFinalModalShowed, setIsFinalModalShowed] = useState(false);
  const [infoMessage, setInfoMessage] = useState();
  const dispatch = useDispatch();
  const { CaseNr } = useSelector((state) => state.case);

  const {
    applicants,
    CompanyName,
    ContactType,
    steps: savedSteps,
  } = useSelector((state) => state.dip);

  const showInfoBox = (message) => {
    setInfoMessage(message);
    setTimeout(() => setInfoMessage(), 2000);
  };
  useCaseData();

  const refetch = useStorePreApplication();
  const saveToRedux = (dip) => {
    dispatch(updateDipData({ dip }));
  };

  const introducerRequest = useRequestWithId(saveDipIntroducer);
  const brokerRequest = useRequestWithId(saveDipBrokerDetails);
  const advanceTypeRequest = useRequestWithId(saveDipAdvanceType);
  const saveContactCompany = useRequestWithId(saveDipContactCompany);
  const saveContactIndividual = useRequestWithId(saveDipContactIndividual);
  const saveBuildingType = useRequestWithId(saveDipBuildingType);
  const saveSecurities = useRequestWithId(saveDipSecurities);
  const loanDetailsRequest = useRequestWithId(saveDipLoanDetails);
  const financialDetailsRequest = useRequestWithId(saveDipFinancialDetails);
  const financialDetailsCalculatorRequest = useRequestWithId(
    saveDipFinancialCalculatorDetails
  );

  const savingRequests = {
    dip_summary: async () => true,
    introducer: introducerRequest,
    broker: brokerRequest,
    advance_type: advanceTypeRequest,
    contact_type: async () => true,
    contact_company: saveContactCompany,
    contact_individual: saveContactIndividual,
    building_type: saveBuildingType,
    securities: saveSecurities,
    loan_details: loanDetailsRequest,
    financial_details: financialDetailsRequest,
    financial_calculator_details: financialDetailsCalculatorRequest,
    summary: () => saveDip({ step_id: "summary_form", id }),
  };

  const goStepBack = () => {
    if (currentStepIndex <= 0) return;

    history.push(`/${caseStage}/${id}/${currentStepIndex - 1}`);
  };

  const getClientName = () => {
    if (ContactType === "company") return CompanyName;
    return applicants[0].Surname;
  };

  const goToNextStep = () => {
    // eslint-disable-next-line no-use-before-define
    if (currentStepIndex >= steps.length - 1) {
      if (CaseNr) {
        setIsFinalModalShowed(true);
        return;
      }

      createCaseReference(getClientName(), id)
        .then(({ data }) => {
          const { CaseNr: caseNumber } = data;
          dispatch(updateCaseNumber(caseNumber));
          setTimeout(() => setIsFinalModalShowed(true), 10);
        })
        .catch((error) => console.error(error));
      return;
    }
    history.push(`/${caseStage}/${id}/${currentStepIndex + 1}`);
  };

  const handleSubmit = async ({ data, stepId }) => {
    saveToRedux(data);

    const result = await savingRequests[stepId](data);

    if (result) {
      goToNextStep();
      refetch();
    }
  };

  const steps = [
    {
      name: DIP_SUMMARY,
      component: (
        <DipSummary finalizeStep={handleSubmit} goStepBack={goStepBack} />
      ),
    },
    {
      name: INTRODUCER_DETAILS,
      component: (
        <IntroducerDetailsForm
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
        />
      ),
    },
    {
      name: TYPE_OF_LOAN,
      component: (
        <TypeOfLoanForm finalizeStep={handleSubmit} goStepBack={goStepBack} />
      ),
    },
    {
      name: TYPE_OF_APPLICANT,
      component: (
        <TypeOfApplicantForm
          finalizeStep={({ data }) => {
            saveToRedux(data);
            goToNextStep();
          }}
          goStepBack={goStepBack}
        />
      ),
    },
    {
      name: APPLICANT_DETAILS,
      component: (
        <ApplicantDetailsFork
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
        />
      ),
    },
    {
      name: SECURITY_DETAILS,
      component: (
        <LoanPropertyTypeForm
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
        />
      ),
    },
    {
      name: SECURITY_DETAILS,
      component: (
        <SecurityDetailsForm
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
          canSkipAddressValidation={canSkipAddressValidation}
        />
      ),
    },
    {
      name: LOAN_DETAILS,
      component: (
        <LoanDetailsForm finalizeStep={handleSubmit} goStepBack={goStepBack} />
      ),
    },
    {
      name: FINANCIAL_DETAILS,
      component: (
        <FinancialDetailsForm
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
        />
      ),
    },
    {
      name: FINANCIAL_DETAILS,
      component: (
        <FinancialDetailsCalculator
          calculatorCache={calculatorCache}
          cacheCalculatorData={cacheCalculatorData}
          finalizeStep={handleSubmit}
          goStepBack={goStepBack}
          showInfoBox={showInfoBox}
        />
      ),
    },
    {
      name: FINANCIAL_DETAILS_SUMMARY,
      component: (
        <SummaryStep finalizeStep={handleSubmit} goStepBack={goStepBack} />
      ),
    },
  ];

  useEffect(() => {
    return () => {
      calculatorCache = {};
    };
  }, []);

  /*
    Some of the steps have the same step name.
    This const is related to the index of first step with a particular name.
  */
  const currentStepNameIndex = namesOrder.indexOf(steps[currentStepIndex].name);

  return (
    <DipWrapper>
      <StepsListMenu
        namesOfSteps={namesOrder}
        stepsWithNames={stepsWithNames}
        savedSteps={savedSteps}
        currentStepNameIndex={currentStepNameIndex}
      />
      <StyledDipContainer phase="dip">
        {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

        <FinalPopup
          isOpen={isFinalModalShowed}
          onClose={() => setIsFinalModalShowed(false)}
          skipGeneratePdf={skipGeneratePdf}
          caseStage={caseStage}
        />

        <StyledFormColumn>
          {currentStepIndex !== 0 && currentStepIndex !== 11 && (
            <>
              <H1>{capitalize(steps[currentStepIndex].name)}</H1>
              <StyledStep>
                {`step ${currentStepNameIndex} of ${namesOrder.length - 2}`}
              </StyledStep>
            </>
          )}
          {steps[currentStepIndex].component}
        </StyledFormColumn>
      </StyledDipContainer>
    </DipWrapper>
  );
};

DipFlow.propTypes = {
  canSkipAddressValidation: PropTypes.bool,
  skipGeneratePdf: PropTypes.bool,
  caseStage: PropTypes.oneOf(["dip", "enquiry"]),
};

export default DipFlow;
