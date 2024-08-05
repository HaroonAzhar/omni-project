import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { titleize } from "inflected";

import { rollbar } from "utils";
import { useInfoMessage } from "hooks";
import { Popup, FormWrapper } from "components/molecules";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "components/application/helpers/hooks";

const ApplicationFlowContainer = ({
  title,
  flowKey,
  forms: formsComponents,
  flowStoreName,
  savingRequest,
  saveFlowToStore,
  shouldShowFinalPopUp = true,
  shouldShowBackToChecklist = true,
  useBackground = true,
}) => {
  const { id, indexOfForm = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const flowStore = useSelector(
    (state) => state.application[flowStoreName] || {}
  );
  const {
    goToFlowHomepage,
    goFormBack,
    goToNextForm,
    goToNextStep: goToNextFlow,
    goBackToChecklist,
    nextStepName,
  } = useApplicationNavigation(flowKey);

  const [infoMessage, setInfoMessage] = useInfoMessage();

  useFetchAndStoreApplicants({ showInfoBox: setInfoMessage });

  const saveToRedux = (data) => {
    dispatch(saveFlowToStore(data));
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

  const earlyFinalizeFlow = ({ data }) => {
    saveToRedux(data);
    setShouldSendRequest(true);
  };

  const forms = formsComponents.map(({ component: Form }) => {
    return {
      component: (
        <Form
          finalizeStep={handleSubmit}
          goStepBack={goBack}
          earlyFinalizeFlow={earlyFinalizeFlow}
        />
      ),
    };
  });

  const sendSavingRequest = useCallback(() => {
    setShouldSendRequest(false);
    savingRequest(id, flowStore)
      .then(() => {
        setInfoMessage("Flow data saved successfully.");
        setIsPopupOpen(true);
      })
      .catch((e) => {
        rollbar.error(e);
        setInfoMessage("Data saving failed!");
      });
  }, [flowStore, id, savingRequest, setInfoMessage]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      {shouldShowFinalPopUp && (
        <Popup
          isOpen={isPopupOpen}
          title={`You’ve just completed: ${title}`}
          desc="Continue checking next step or back to the Application"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: goBackToChecklist,
            children: "Go to the Application",
          }}
          primaryButton={{
            onClick: goToNextFlow,
            children: `Go to the ${titleize(nextStepName)}`,
          }}
        />
      )}

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        backToChecklistText={
          shouldShowBackToChecklist && "Back to the Application"
        }
        totalForms={forms.length}
        title={title}
        useBackground={useBackground}
      >
        {(forms[currentFormIndex] && forms[currentFormIndex].component) ||
          forms[0].component}
      </FormWrapper>
    </>
  );
};

ApplicationFlowContainer.propTypes = {
  title: PropTypes.string.isRequired,
  flowKey: PropTypes.string.isRequired,
  forms: PropTypes.array.isRequired,
  flowStoreName: PropTypes.string.isRequired,
  savingRequest: PropTypes.func.isRequired,
  saveFlowToStore: PropTypes.func.isRequired,
  shouldShowFinalPopUp: PropTypes.bool,
  shouldShowBackToChecklist: PropTypes.bool,
  useBackground: PropTypes.bool,
};

export default ApplicationFlowContainer;
