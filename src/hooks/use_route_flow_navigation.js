import { useRouteMatch } from "react-router-dom";
import { compile } from "path-to-regexp";

const nullParams = {
  indexOfProperty: null,
  indexOfElement: null,
  indexOfForm: null,
  flowName: null,
  tabName: null,
};

export default () => {
  const { path, params } = useRouteMatch();
  const { indexOfForm = 0, indexOfProperty = 0, indexOfElement = 0 } = params;

  const getPathWithChangedParams = (newParams) =>
    compile(path)({
      ...params,
      indexOfForm,
      indexOfProperty,
      indexOfElement,
      ...newParams,
    });

  return {
    nextFormPath: getPathWithChangedParams({ indexOfForm: +indexOfForm + 1 }),
    previousFormPath: getPathWithChangedParams({
      indexOfForm: +indexOfForm - 1,
    }),
    getPathToFlow: (flowName) =>
      getPathWithChangedParams({ ...nullParams, flowName }),
    getPathToTab: (tabName) =>
      getPathWithChangedParams({
        /*
        TODO: Here should be used a method that resets params to default.
        At the moment when in the url we add some params, we need reset them here as well.
      */
        ...nullParams,
        tabName,
      }),
    getPathWithChangedParams,
    changePathToMenu: () => {
      // TODO: It should redirect to the application sub-menu or to the application checklist.
    },
  };
};
