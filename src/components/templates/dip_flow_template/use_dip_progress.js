import { useMemo } from "react";

import useRouteFlowNavigation from "hooks/use_route_flow_navigation";

const useDipProgress = (stepsWithNames, currentStepNameIndex, savedSteps) => {
  const { getPathWithChangedParams } = useRouteFlowNavigation();

  const getLinkToForm = (indexOfStep) =>
    getPathWithChangedParams({
      indexOfStep,
    });

  const savedStepsNames = savedSteps.map(({ Name }) => Name);

  const progressBarData = useMemo(() => {
    let prevSaved = true;

    return stepsWithNames.map(({ stepName, stepIndex }, index) => {
      const saved = savedStepsNames.includes(stepName);
      const edited = saved || prevSaved;
      prevSaved = saved;
      return {
        key: `${stepName}${index}`,
        stepIndex,
        edited,
        active: index === currentStepNameIndex,
        stepName,
      };
    });
  }, [stepsWithNames, currentStepNameIndex, savedStepsNames]);

  return { getLinkToForm, progressBarData };
};

export default useDipProgress;
