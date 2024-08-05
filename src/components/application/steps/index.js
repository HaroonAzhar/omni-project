import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container } from "components/atoms";
import { StepsNavigation } from "components/molecules";
import { useRouteFlowNavigation } from "hooks";

import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../helpers/hooks";
import ApplicantDetails from "./applicant_details";
import CompanyDetails from "./company_details";
import CompanyStructure from "./company_structure";
import CreditHistory from "./credit_history";
import LoanDetails from "./loan_details";
import SecurityDetails from "./security_details";
import IntroducerDetails from "./introducer_details";
import SolicitorsDetails from "./solicitors_details";
import AdditionalInformation from "./additional_information";
import DeclarationsAndSignatures from "./declarations_and_signatures";
import AmlKycRouter from "./aml_kyc/router";
import AssetsAndLiabilitiesRouter from "./assets_details/router";
import ValuationReportTool from "./valuation_report";
import { getApplicationStepsData } from "../selectors";
import ViewApplication from "./view_application";

const flows = {
  applicant_details: ApplicantDetails,
  company_details: CompanyDetails,
  credit_history: CreditHistory,
  security_details: SecurityDetails,
  loan_details: LoanDetails,
  introducer_details: IntroducerDetails,
  solicitor_details: SolicitorsDetails,
  additional_information: AdditionalInformation,
  declarations: DeclarationsAndSignatures,
  assets_and_liabilities: AssetsAndLiabilitiesRouter,
  aml_kyc: AmlKycRouter,
  valuation_report: ValuationReportTool,
  view_application: ViewApplication,
  company_structure: CompanyStructure,
};

const ApplicationSteps = () => {
  const { flowName } = useParams();
  const Flow = flows[flowName];
  const { getPathWithChangedParams } = useRouteFlowNavigation();

  const { applicationHomepage } = useApplicationNavigation();

  const steps = useSelector(getApplicationStepsData);

  const getLinkToStep = (stepName) =>
    getPathWithChangedParams({
      flowName: stepName,
      indexOfElement: null,
      indexOfForm: null,
      tabName: null,
    });

  const initialRequest = useFetchAndStoreApplicants({ showInfoBox: () => {} });
  useEffect(initialRequest, []);

  return (
    <Container>
      <StepsNavigation
        storeName="application"
        steps={steps}
        getLinkToStep={getLinkToStep}
        applicationHomepage={applicationHomepage}
      />
      <Flow />
    </Container>
  );
};

export default ApplicationSteps;
