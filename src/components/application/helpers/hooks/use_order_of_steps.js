import { useSelector } from "react-redux";

import { setStepsInOrder } from "..";

export default () => {
  const steps = useSelector((store) => store.application.steps) || [];
  return setStepsInOrder(steps).map(({ name }) => name);
};
