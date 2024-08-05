import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { rollbar, getIndividualTitle } from "utils";
import { saveApplicantState } from "store/application/actions";
import { Popup, FormWrapper } from "components/molecules";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { useInfoMessage, useRouteFlowNavigation } from "hooks";

import usePatchApplicantPortfolio from "../use_patch_applicant_portfolio";
import useAssetsFlowPaths from "../use_assets_flow_paths";
import PropertyPortfolioForm from "./property_portfolio_form";

const getPropertyTitle = (individual = { property_portfolio: [] }, index) =>
  individual.property_portfolio[index] &&
  individual.property_portfolio[index].address_line_1;

const PropertyPortfolio = () => {
  const {
    id,
    indexOfForm = 0,
    indexOfElement = 0,
    indexOfProperty = 0,
  } = useParams();
  const currentFormIndex = +indexOfForm;
  const history = useHistory();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [infoMessage, showInfoBox] = useInfoMessage();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const visibleIndexOfApplicant = +indexOfElement + 1;
  const { goBackToChecklist, goBackToListOfApplicants } = useAssetsFlowPaths(
    "assets_and_liabilities"
  );
  const { nextFormPath } = useRouteFlowNavigation();

  const individuals =
    useSelector((state) => state.application.individuals) || [];
  const individualTitle =
    getIndividualTitle(individuals[indexOfElement]) || "Applicant";

  const propertyTitle =
    getPropertyTitle(individuals[indexOfElement], indexOfProperty) ||
    "Property";

  const sendInitialRequests = useFetchAndStoreApplicants({
    showInfoBox,
  });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, sendInitialRequests]);

  const saveToRedux = ({ data }) => {
    dispatch(saveApplicantState(indexOfElement, data));
  };

  const handleSubmit = async ({ data }) => {
    saveToRedux(data);
    goToNextStep();
  };

  const savingPortfolioRequest = usePatchApplicantPortfolio(id);

  const sendSavingRequest = useCallback(() => {
    setShouldSendRequest(false);
    const applicant = individuals[indexOfElement];

    savingPortfolioRequest(applicant)
      .then(() => {
        setIsPopupOpen(true);
        sendInitialRequests();
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
      });
  }, [
    indexOfElement,
    individuals,
    savingPortfolioRequest,
    sendInitialRequests,
    showInfoBox,
  ]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  const goToNextStep = () => {
    if (currentFormIndex >= forms.length - 1) {
      setShouldSendRequest(true);
      return;
    }
    history.push(nextFormPath);
  };

  const finalizeStep = (data) => handleSubmit({ data: { ...data } });

  const forms = [
    {
      component: (
        <PropertyPortfolioForm
          finalizeStep={finalizeStep}
          goStepBack={goBackToListOfApplicants}
        />
      ),
    },
  ];

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}
      <Popup
        isOpen={isPopupOpen}
        title={`You’ve just completed: Assets and liabilities - Property Portfolio for Applicant ${visibleIndexOfApplicant}`}
        desc="Continue to list of properties or Back to the Application"
        onClose={() => setIsPopupOpen(false)}
        secondaryButton={{
          onClick: () => {
            setIsPopupOpen(false);
            goBackToChecklist();
          },
          children: "Back to the Application",
        }}
        primaryButton={{
          onClick: () => {
            setIsPopupOpen(false);
            goBackToListOfApplicants();
          },
          children: "Go to assets table",
        }}
      />
      <FormWrapper
        onBackToChecklist={goBackToListOfApplicants}
        totalForms={forms.length}
        title={`${individualTitle}, ${propertyTitle} - Assets & liabilities statement`}
        backToChecklistText="Back to assets table"
      >
        {forms[currentFormIndex].component}
      </FormWrapper>
    </>
  );
};
export default PropertyPortfolio;
