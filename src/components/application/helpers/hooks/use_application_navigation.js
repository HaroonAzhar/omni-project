import { useHistory, useParams } from "react-router-dom";

import { useRouteFlowNavigation } from "hooks";

import useOrderOfSteps from "./use_order_of_steps";

export default (currentStepName) => {
  const {
    getPathToFlow,
    nextFormPath,
    previousFormPath,
  } = useRouteFlowNavigation();
  const { id } = useParams();
  const history = useHistory();
  const applicationHomepage = `/application/${id}`;

  const orderOfSteps = useOrderOfSteps();

  const currentStepIndex = orderOfSteps.indexOf(currentStepName);
  const nextStepName =
    currentStepIndex + 1 && orderOfSteps[currentStepIndex + 1];

  const goBackToChecklist = () => {
    history.push(applicationHomepage);
  };

  const goToNextStep = () => {
    if (nextStepName) history.push(getPathToFlow(nextStepName));
  };

  const goToNextForm = () => {
    history.push(nextFormPath);
  };

  const goFormBack = () => {
    history.push(previousFormPath);
  };

  const goToFlowHomepage = (flowName) => {
    const pathPart = typeof flowName === "string" ? flowName : currentStepName;
    history.push(`${applicationHomepage}/checklist/${pathPart}`);
  };

  return {
    goBackToChecklist,
    goToFlowHomepage,
    nextStepName,
    goToNextStep,
    goToNextForm,
    goFormBack,
    applicationHomepage,
  };
};
