import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { titleize } from "inflected";

import { rollbar } from "utils";
import {
  saveAdditionalData,
  saveCaseOverviewState,
} from "store/application/actions";
import { saveAdditionalInformation } from "utils/requests";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { Popup, FormWrapper } from "components/molecules";
import { useSubmitCaseSummary } from "components/case_summary/steps/shared";
import { getExpectedCompletionDateOfOverview } from "components/case_summary/selectors";

import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";
import Form1 from "./form_1";

const AdditionalInformation = () => {
  const { id, indexOfForm = 0 } = useParams();
  const currentStepIndex = +indexOfForm;
  const [infoMessage, setInfoMessage] = useState();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    goBackToChecklist,
    nextStepName,
    goToNextForm,
    goToNextStep,
  } = useApplicationNavigation("additional_information");
  const additional_information = useSelector(
    (state) => state.application.additional_information
  );
  const expectedCompletionDate = useSelector(
    getExpectedCompletionDateOfOverview
  );

  const showInfoBox = (message) => {
    // eslint-disable-line
    setInfoMessage(message);
    setTimeout(() => setInfoMessage(), 2000);
  };

  useFetchAndStoreApplicants({ showInfoBox });

  const saveToRedux = (data) => {
    const { expected_completion_date, ...rest } = data;

    dispatch(saveAdditionalData(rest));
    dispatch(saveCaseOverviewState({ expected_completion_date }));
  };

  const submitCaseSummary = useSubmitCaseSummary();
  const handleSubmit = async ({ data }) => {
    saveToRedux(data);

    if (currentStepIndex >= forms.length - 1) {
      setShouldSendRequest(true);
      return;
    }

    goToNextForm();
  };

  const forms = [
    {
      component: <Form1 finalizeStep={handleSubmit} />,
    },
  ];

  const sendSavingRequest = useCallback(() => {
    saveAdditionalInformation(id, additional_information)
      .then(() => {
        submitCaseSummary("overview", {
          expected_completion_date: expectedCompletionDate,
        }).then(() => setIsPopupOpen(true));
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
      });
  }, [additional_information, expectedCompletionDate, id, submitCaseSummary]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      {
        <Popup
          isOpen={isPopupOpen}
          title="You’ve just completed: Additional information"
          desc="Continue checking next step or back to the Application"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: goBackToChecklist,
            children: "Back to the Application",
          }}
          primaryButton={{
            onClick: goToNextStep,
            children: `Go to the ${titleize(nextStepName)}`,
          }}
        />
      }

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        backToChecklistText="Back to the Application"
        totalForms={forms.length}
        title="Additional information"
      >
        {forms[currentStepIndex].component}
      </FormWrapper>
    </>
  );
};

export default AdditionalInformation;
