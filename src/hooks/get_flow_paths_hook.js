import { useHistory, useParams } from "react-router-dom";

export default (stageName, orderOfSteps) => (currentStepName) => {
  const { id } = useParams();
  const history = useHistory();
  const caseSummaryHomepage = `/${stageName}/${id}`;

  const goBackToChecklist = () => {
    history.push(caseSummaryHomepage);
  };

  const getLinkToStep = (stepName) => {
    return `${caseSummaryHomepage}/checklist/${stepName}`;
  };

  const goToStep = (stepName) => history.push(getLinkToStep(stepName));

  const goStepBack = () => {
    const currentStepIndex = orderOfSteps.indexOf(currentStepName);
    const lastStepName =
      currentStepIndex - 1 > -1 && orderOfSteps[currentStepIndex - 1];

    if (lastStepName) goToStep(lastStepName);
  };

  const goToNextStep = () => {
    const currentStepIndex = orderOfSteps.indexOf(currentStepName);
    const nextStepName =
      currentStepIndex + 1 && orderOfSteps[currentStepIndex + 1];

    if (nextStepName) goToStep(nextStepName);
  };

  return {
    goBackToChecklist,
    getLinkToStep,
    goToStep,
    goStepBack,
    goToNextStep,
  };
};
