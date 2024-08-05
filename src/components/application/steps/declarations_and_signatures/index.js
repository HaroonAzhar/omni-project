import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { rollbar } from "utils";
import { saveAllApplicantsState } from "store/application/actions";
import { patchApplicant } from "utils/requests";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { Popup, FormWrapper } from "components/molecules";
import { useFetchAndStoreApplicants } from "components/application/helpers/hooks";
import { useInfoMessage } from "hooks";

import { useApplicationNavigation } from "../../helpers/hooks";
import Form1 from "./form_1";

const AdditionalInformation = () => {
  const { id, indexOfForm = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const [infoMessage, showInfoBox] = useInfoMessage();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    goToFlowHomepage,
    goFormBack,
    goToNextForm,
    goBackToChecklist,
  } = useApplicationNavigation("declarations");

  const individuals = useSelector((state) => state.application.individuals);

  const sendInitialRequests = useFetchAndStoreApplicants({
    showInfoBox,
    id,
  });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, id, sendInitialRequests]);

  const saveToRedux = (data) => {
    dispatch(saveAllApplicantsState(data));
  };

  const handleSubmit = async ({ data }) => {
    saveToRedux(data);

    if (currentFormIndex >= forms.length - 1) {
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

  const forms = [
    {
      component: <Form1 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
  ];

  const sendSavingRequest = useCallback(async () => {
    let success = true;
    for (const { declarations_signatures, applicant_id } of individuals) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await patchApplicant({
          id,
          applicant: { declarations_signatures, applicant_id },
          applicantType: "individual",
        });
      } catch (e) {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
        success = false;
      }
    }
    if (success) {
      setIsPopupOpen(true);
    }
  }, [id, individuals, showInfoBox]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      {
        <Popup
          isOpen={isPopupOpen}
          title="You’ve just completed: Declarations and signatures"
          desc="Continue checking next step or back to the Application"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: goBackToChecklist,
            children: "Back to the Application",
          }}
        />
      }

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        backToChecklistText="Back to the Application"
        title="Declarations"
        totalForms={forms.length}
      >
        {forms[currentFormIndex].component}
      </FormWrapper>
    </>
  );
};

export default AdditionalInformation;
