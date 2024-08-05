import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { saveCompanyData } from "store/application/actions";
import { useInfoMessage } from "hooks";
import {
  getCompanyOfficers,
  getCompanyDetails,
  saveApplicant,
  patchApplicant,
} from "utils/requests";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { Popup, FormWrapper } from "components/molecules";

import Form1 from "./forms/form_1";
import Form2 from "./forms/form_2";
import Form3 from "./forms/form_3";
import Form6 from "./forms/form_6";
import { getCompany } from "../../helpers/company_data_selector";
import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";

const CompanyDetails = () => {
  const caseStage = "application";
  const { id, indexOfForm = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const company_number = useSelector(
    (state) => state.application.company_number
  );
  const {
    goToFlowHomepage,
    goFormBack,
    goToNextStep,
    goToNextForm,
    goBackToChecklist,
  } = useApplicationNavigation("company_details");

  const company = useSelector(getCompany);

  const [infoMessage, showInfoBox] = useInfoMessage();
  const sendInitialRequests = useFetchAndStoreApplicants({ showInfoBox });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, caseStage, id, sendInitialRequests]);

  const sendGetCompanyOfficersRequest = useCallback(
    (companyNumber) =>
      getCompanyOfficers(companyNumber).then((companyOfficersResponse) => {
        dispatch(
          saveCompanyData({
            companyOfficersResponse,
          })
        );
        return companyOfficersResponse;
      }),
    [dispatch]
  );

  // TODO: It can be moved to the Form1 component.
  useEffect(() => {
    if (!company_number) return;

    sendGetCompanyOfficersRequest(company_number);

    getCompanyDetails(company_number).then((companyDetailsResponse) => {
      dispatch(
        saveCompanyData({
          companyDetailsResponse,
        })
      );
    });
  }, [company_number, dispatch, sendGetCompanyOfficersRequest]);

  const saveToRedux = (data) => {
    dispatch(saveCompanyData(data));
  };

  const handleSubmit = async ({ data }) => {
    saveToRedux(data);

    if (currentFormIndex >= steps.length - 1) {
      setShouldSendRequest(true);
      return;
    }

    goToNextForm();
  };

  const goBack = () => {
    if (currentFormIndex <= 0) {
      goToFlowHomepage();
    } else {
      goFormBack();
    }
  };

  const steps = [
    {
      component: <Form1 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form2 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form3 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form6 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
  ];

  const sendSavingRequest = useCallback(() => {
    const toSend = { ...company };
    delete toSend.companyOfficersResponse;
    delete toSend.companyDetailsResponse;
    delete toSend.type_of_applicant;
    delete toSend.credit_history;
    if (toSend.accountant) delete toSend.accountant.address.address_type;

    setShouldSendRequest(false);

    if (toSend.applicant_id) {
      patchApplicant({
        id,
        applicant: toSend,
        applicantType: "company",
      })
        .then(() => setIsPopupOpen(true))
        .catch(() => {
          showInfoBox("Saving data failed!");
        });
    } else {
      saveApplicant({ attributes: { company: toSend }, id })
        .then(() => {
          sendInitialRequests();
          setIsPopupOpen(true);
        })
        .catch(() => {
          showInfoBox("Saving data failed!");
        });
    }
  }, [company, id, sendInitialRequests, showInfoBox]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      <Popup
        isOpen={isPopupOpen}
        title="You’ve just completed: Company Details"
        desc="Continue checking next step or back to the Application"
        onClose={() => setIsPopupOpen(false)}
        secondaryButton={{
          onClick: goBackToChecklist,
          children: "Go to the Application",
        }}
        primaryButton={{
          onClick: goToNextStep,
          children: "Go to the Directors/Shareholders",
        }}
      />

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        backToChecklistText="Back to the Application"
        totalForms={steps.length}
        title="Company/SPV details"
      >
        {steps[currentFormIndex].component}
      </FormWrapper>
    </>
  );
};

export default CompanyDetails;
