import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { rollbar } from "utils";
import { saveIntroducerData } from "store/application/actions";
import { saveIntroducerDetails } from "utils/requests";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { Popup, FormWrapper } from "components/molecules";
import { getIntroducerDetailsOfApplication } from "components/application/selectors";

import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";
import Form1 from "./form_1";
import Form2 from "./form_2";

const IntroducerDetails = () => {
  const { id, indexOfForm = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const [infoMessage, setInfoMessage] = useState();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    goToFlowHomepage,
    goFormBack,
    goToNextForm,
    goToNextStep,
    goBackToChecklist,
  } = useApplicationNavigation("introducer_details");

  const introducer_details = useSelector(getIntroducerDetailsOfApplication);

  const showInfoBox = (message) => {
    setInfoMessage(message);
    setTimeout(() => setInfoMessage(), 2000);
  };

  useFetchAndStoreApplicants({ showInfoBox });

  const saveToRedux = (data) => {
    dispatch(saveIntroducerData(data));
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
    {
      component: <Form2 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
  ];

  const sendSavingRequest = useCallback(() => {
    saveIntroducerDetails(id, introducer_details)
      .then(() => {
        setIsPopupOpen(true);
      })
      .catch((e) => {
        rollbar.error(e);
        showInfoBox("Data saving failed!");
      });
  }, [id, introducer_details]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  return (
    <>
      {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}

      {
        <Popup
          isOpen={isPopupOpen}
          title="You’ve just completed: Introducer Details"
          desc="Continue checking next step or back to the Application"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: goBackToChecklist,
            children: "Back to the Application",
          }}
          primaryButton={{
            onClick: goToNextStep,
            children: "Go to the next Flow",
          }}
        />
      }

      <FormWrapper
        onBackToChecklist={goBackToChecklist}
        backToChecklistText="Back to the Application"
        totalForms={forms.length}
        title="Introducer/Packager details"
      >
        {forms[currentFormIndex].component}
      </FormWrapper>
    </>
  );
};

export default IntroducerDetails;
