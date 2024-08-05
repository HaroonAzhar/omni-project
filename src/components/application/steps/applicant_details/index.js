import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { pluralize, titleize } from "inflected";
import { useDispatch, useSelector } from "react-redux";

import { getIndividualTitle } from "utils";
import { saveApplicantState } from "store/application/actions";
import { saveApplicant, patchApplicant } from "utils/requests";
import { Popup, FormWrapper } from "components/molecules";
import { StyledInfoBox } from "components/templates/dip_flow_template/styled_dip_flow";

import IndividualApplicantHomeScreen from "./home_screen";
import { Form1, Form2, Form3, Form4, Form5 } from "./forms";
import {
  useApplicationNavigation,
  useFetchAndStoreApplicants,
} from "../../helpers/hooks";

const elementNames = {
  individual: "Applicant",
  company: "Director/Shareholder",
};

const IndividualDetails = () => {
  const { id, indexOfForm = 0, indexOfElement = 0 } = useParams();
  const currentFormIndex = +indexOfForm;
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState();
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  const [sendRequestInProgress, setSendRequestInProgress] = useState(false);

  const {
    goToFlowHomepage,
    goFormBack,
    goToNextForm,
    goToNextStep,
    nextStepName,
  } = useApplicationNavigation("applicant_details");

  const { individuals, type_of_applicant: typeOfApplicant } = useSelector(
    (state) => state.application
  );
  const individual = individuals && individuals[indexOfElement];

  const elementName = elementNames[typeOfApplicant] || "Applicant";

  const visibleIndexOfApplicant = +indexOfElement + 1;
  const applicantTitle =
    getIndividualTitle(individual) ||
    `${elementName} ${visibleIndexOfApplicant}`;

  const showInfoBox = useCallback(
    (message) => {
      setInfoMessage(message);
      setTimeout(() => setInfoMessage(), 2000);
    },
    [setInfoMessage]
  );

  const sendInitialRequests = useFetchAndStoreApplicants({ showInfoBox });

  useEffect(() => {
    sendInitialRequests();
  }, [dispatch, id, sendInitialRequests]);

  const saveToRedux = ({ data }) => {
    dispatch(saveApplicantState(indexOfElement, data));
  };

  const handleSubmit = ({ data }) => {
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

  const sendSavingRequest = useCallback(() => {
    setShouldSendRequest(false);
    if (sendRequestInProgress) return;
    const {
      personal_data,
      addresses,
      contact,
      applicant_id,
      links,
    } = individuals[indexOfElement];

    const editedData = {
      status: "Edited",
      date_edited: new Date(),
      links,
    };

    individuals[indexOfElement] = {
      ...individuals[indexOfElement],
      ...editedData,
    };

    setSendRequestInProgress(true);

    if (applicant_id) {
      patchApplicant({
        id,
        applicant: {
          personal_data,
          addresses,
          contact,
          applicant_id,
          ...editedData,
        },
        applicantType: "individual",
      })
        .then(() => {
          setIsPopupOpen(true);
        })
        .catch(() => {
          showInfoBox("Saving data failed!");
        })
        .finally(() => {
          sendInitialRequests();
          setSendRequestInProgress(false);
        });
    } else {
      saveApplicant({ attributes: { individuals }, id })
        .then(() => {
          setIsPopupOpen(true);
        })
        .catch(() => {
          showInfoBox("Saving data failed!");
        })
        .finally(() => {
          sendInitialRequests(); // Update data with the new applicant (with assigned applicant_id)
          setSendRequestInProgress(false);
        });
    }
  }, [
    individuals,
    indexOfElement,
    id,
    showInfoBox,
    sendInitialRequests,
    setSendRequestInProgress,
    sendRequestInProgress,
  ]);

  useEffect(() => {
    if (shouldSendRequest) sendSavingRequest();
  }, [shouldSendRequest, sendSavingRequest]);

  const finalizeStep = (data) =>
    handleSubmit({ data: { ...data }, step_id: "company_details_form" });

  const forms = [
    {
      component: <Form1 finalizeStep={finalizeStep} goStepBack={goBack} />,
    },
    {
      component: <Form2 finalizeStep={finalizeStep} goStepBack={goBack} />,
    },
    {
      component: <Form3 finalizeStep={finalizeStep} goStepBack={goBack} />,
    },
    {
      component: <Form4 finalizeStep={finalizeStep} goStepBack={goBack} />,
    },
    {
      component: <Form5 finalizeStep={finalizeStep} goStepBack={goBack} />,
    },
  ];

  if (indexOfElement) {
    return (
      <>
        {infoMessage && <StyledInfoBox>{infoMessage}</StyledInfoBox>}
        <Popup
          isOpen={isPopupOpen}
          title={`You’ve just completed: Applicant Details for ${applicantTitle}`}
          desc={`Continue filling next step or back to the list of ${pluralize(
            elementName
          )}`}
          onClose={() => setIsPopupOpen(false)}
          secondaryButton={{
            onClick: () => {
              goToFlowHomepage();
              setIsPopupOpen(false);
            },
            children: `Go to the list of ${pluralize(elementName)}`,
          }}
          primaryButton={{
            onClick: () => {
              goToNextStep();
              setIsPopupOpen(false);
            },
            children: `Go to the ${titleize(nextStepName)}`,
          }}
        />
        <FormWrapper
          onBackToChecklist={goToFlowHomepage}
          totalForms={forms.length}
          title={`${applicantTitle} details`}
          backToChecklistText={`Back to the list of ${pluralize(elementName)}`}
        >
          {forms[currentFormIndex].component}
        </FormWrapper>
      </>
    );
  } else {
    return <IndividualApplicantHomeScreen />;
  }
};
export default IndividualDetails;
