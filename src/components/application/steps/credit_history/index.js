import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { rollbar, getIndividualTitle } from "utils";
import { saveApplicantState } from "store/application/actions";
import { patchApplicant } from "utils/requests";
import { Popup, FormWrapper } from "components/molecules";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { useInfoMessage } from "hooks";

import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";
import CreditHistoryForm from "./credit_history_form";
import CreditHistoryApplicantHomeScreen from "./credit_history_home_screen";

const CreditHistory = () => {
  const { id, indexOfForm = 0, indexOfElement = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const dispatch = useDispatch();

  const { goBackToChecklist, goToFlowHomepage } = useApplicationNavigation(
    "credit_history"
  );

  const [infoMessage, showInfoBox] = useInfoMessage();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const visibleIndexOfApplicant = +indexOfElement + 1;

  const individuals = useSelector((state) => state.application.individuals);

  const individual = individuals && individuals[indexOfElement];
  const individualName = getIndividualTitle(individual) || "Applicant";

  const sendInitialRequests = useFetchAndStoreApplicants({ showInfoBox });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, id, indexOfElement, sendInitialRequests]);

  const saveToRedux = ({ data }) => {
    dispatch(saveApplicantState(indexOfElement, data));
  };

  const handleSubmit = ({ data }) => {
    saveToRedux(data);
    setShouldSendRequest(true);
  };

  const sendSavingRequest = useCallback(() => {
    setShouldSendRequest(false);
    const applicant = individuals[indexOfElement];
    const { credit_history, applicant_id } = applicant;
    const editedData = { status: "Edited", date_edited: new Date() };

    patchApplicant({
      applicant: {
        credit_history: { ...credit_history, ...editedData },
        applicant_id,
      },
      id,
      applicantType: "individual",
    })
      .then(() => {
        sendInitialRequests();
        setIsPopupOpen(true);
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
      });
  }, [id, indexOfElement, individuals, sendInitialRequests, showInfoBox]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  const finalizeStep = (data) => handleSubmit({ data: { ...data } });

  const forms = [
    {
      component: <CreditHistoryForm finalizeStep={finalizeStep} />,
    },
  ];

  if (indexOfElement) {
    return (
      <>
        {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}
        <Popup
          isOpen={isPopupOpen}
          title={`You’ve just completed: Credit History for Applicant ${visibleIndexOfApplicant}`}
          desc="Continue to list of applicants or Back to the Application"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: () => {
              goBackToChecklist();
              setIsPopupOpen(false);
            },
            children: "Back to the Application",
          }}
          primaryButton={{
            onClick: () => {
              goToFlowHomepage();
              setIsPopupOpen(false);
            },
            children: "Go to the list of applicants",
          }}
        />
        <FormWrapper
          onBackToChecklist={goToFlowHomepage}
          totalForms={forms.length}
          title={`${individualName} Credit history`}
          backToChecklistText="Back to the list of Applicants"
        >
          {forms[currentFormIndex].component}
        </FormWrapper>
      </>
    );
  } else {
    return <CreditHistoryApplicantHomeScreen />;
  }
};
export default CreditHistory;
