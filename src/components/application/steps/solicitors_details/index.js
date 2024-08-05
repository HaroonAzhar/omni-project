import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { rollbar } from "utils";
import { saveSolicitorsData } from "store/application/actions";
import { saveSolicitorsDetails } from "utils/requests";
import { Popup, FormWrapper } from "components/molecules";
import { useProgress } from "components/progress";

import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";
import Form1 from "./form_1";
import Form2 from "./form_2";

const SolicitorsDetails = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id, indexOfForm = 0 } = useParams();
  const [, setLoading] = useProgress();

  const {
    goToNextForm,
    goBackToChecklist,
    goToNextStep,
    goFormBack,
  } = useApplicationNavigation("solicitor_details");

  const currentFormIndex = +indexOfForm;
  const solicitorDetails = useSelector(
    (state) => state.application.solicitor_details
  );

  // use API to save data
  const sendSavingRequest = useCallback(() => {
    setLoading(true);

    saveSolicitorsDetails(id, solicitorDetails)
      .then(() => {
        setIsPopupOpen(true);
      })
      .catch((e) => {
        rollbar.error(e);

        addToast("Data saving failed!", { appearance: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addToast, id, setLoading, solicitorDetails]);

  // handle change in redux to force saving
  useEffect(() => {
    if (shouldSendRequest) {
      sendSavingRequest();
    }
  }, [shouldSendRequest, sendSavingRequest]);

  useFetchAndStoreApplicants({ showInfoBox: addToast });

  const handleSubmit = ({ data }) => {
    dispatch(saveSolicitorsData(data));

    // eslint-disable-next-line no-use-before-define
    if (currentFormIndex >= forms.length - 1) {
      return setShouldSendRequest(true);
    }

    goToNextForm();
  };

  const goBack = () => {
    if (currentFormIndex <= 0) {
      goBackToChecklist();
    } else {
      goFormBack();
    }
  };

  const forms = [
    {
      component: <Form1 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form2 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
  ];

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        title="You’ve just completed: Solicitors"
        desc="Continue checking next step or back to the Application"
        onClose={() => setIsPopupOpen(false)}
        secondaryButton={{
          onClick: goBackToChecklist,
          children: "Back to the Application",
        }}
        primaryButton={{
          onClick: goToNextStep,
          children: "Go to the Additional information",
        }}
      />

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        title="Solicitor Details"
        backToChecklistText="Back to the Application"
        totalForms={forms.length}
      >
        {forms[indexOfForm].component}
      </FormWrapper>
    </>
  );
};

export default SolicitorsDetails;
