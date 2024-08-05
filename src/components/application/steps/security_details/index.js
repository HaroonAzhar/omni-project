import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { titleize } from "inflected";

import { savePropertyStore } from "store/application/actions";
import { saveProperty } from "utils/requests";
import { FormWrapper, Popup } from "components/molecules";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";
import { useInfoMessage } from "hooks";
import { useApplicationNavigation } from "components/application/helpers/hooks";

import SecuritiesHomeScreen from "./security_details_home_screen";
import { Form1, Form2, Form3, Form4, Form5, Form6 } from "./forms";

const getPropertyName = (property = {}) =>
  property.address && property.address.line_1;

const SecurityDetails = () => {
  const {
    id,
    indexOfElement: indexOfProperty = 0,
    indexOfForm = 0,
  } = useParams();
  const currentFormIndex = +indexOfForm;
  const visibleIndexOfProperty = +indexOfProperty + 1;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const properties = useSelector((state) => state.application.properties) || [];
  const {
    nextStepName,
    goToNextStep,
    goFormBack,
    goToFlowHomepage,
    goToNextForm,
  } = useApplicationNavigation("security_details");

  const propertyName = getPropertyName(properties[indexOfProperty]);

  const dispatch = useDispatch();

  const [infoMessage, showInfoBox] = useInfoMessage();

  const saveToRedux = (data) => {
    dispatch(savePropertyStore(indexOfProperty, data));
  };

  const handleSubmit = async ({ data }) => {
    saveToRedux({ ...data });

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

  const sendSavingRequest = useCallback(() => {
    setShouldSendRequest(false);
    const toSend = properties.map((property, index) => {
      delete property.id;
      if (index === Number(indexOfProperty)) {
        property.status = "Edited";
        property.date_edited = new Date();
      }
      return property;
    });
    saveProperty({ attributes: { properties: toSend }, id })
      .then(() => {
        setIsPopupOpen(true);
      })
      .catch(() => {
        showInfoBox("Saving data failed!");
      });
  }, [properties, id, indexOfProperty, showInfoBox]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  const forms = [
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
      component: <Form4 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form5 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
    {
      component: <Form6 finalizeStep={handleSubmit} goStepBack={goBack} />,
    },
  ];

  const popupBackCleanup = () => {
    setIsPopupOpen(false);
    goToFlowHomepage();
  };

  if (indexOfProperty) {
    return (
      <>
        {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}
        <Popup
          isOpen={isPopupOpen}
          title={`You’ve just completed: Security Details for Security ${visibleIndexOfProperty}`}
          desc="Continue filling next step or back to the list of Properties"
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: popupBackCleanup,
            children: "Go to the list of Properties",
          }}
          primaryButton={{
            onClick: goToNextStep,
            children: `Go to the ${titleize(nextStepName)}`,
          }}
        />
        <FormWrapper
          onBackToChecklist={goToFlowHomepage}
          totalForms={forms.length}
          title={`${propertyName} details`}
          backToChecklistText="Back to list of Properties"
        >
          {forms[currentFormIndex].component}
        </FormWrapper>
      </>
    );
  } else {
    return <SecuritiesHomeScreen nextStepName={nextStepName} />;
  }
};
export default SecurityDetails;
