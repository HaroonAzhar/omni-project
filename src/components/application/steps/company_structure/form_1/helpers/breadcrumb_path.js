import React from "react";

import { Button } from "components/atoms";

import findParent from "./findParent";
import canNotNavigateTo from "./can_not_navigate_to";

const combinePathElements = (paths, setCurrentView, listOfNonNavigableKeys) => {
  const isPathElementNonNavigableToo = (key) =>
    listOfNonNavigableKeys.indexOf(key) !== -1;
  return paths
    .reverse()
    .map(({ key, name }) => {
      if (isPathElementNonNavigableToo(key)) {
        return name;
      }

      return (
        <Button
          kind="extra"
          type="button"
          onClick={() => {
            setCurrentView(key);
          }}
        >
          {name}
        </Button>
      );
    })
    .reduce((prev, curr) => [prev, " / ", curr]);
};

const makeCurrentViewNonNavigableTo = (listOfNonNavigableKeys, currentView) =>
  listOfNonNavigableKeys.push(currentView);

const breadcrumbPath = (
  sharedHoldersDetails,
  sharedHoldersStructure,
  currentView,
  setCurrentView,
  errors
) => {
  let key = currentView;
  const paths = [];

  while (key !== undefined) {
    paths.push({ key, name: sharedHoldersDetails[key].name });

    key = findParent(sharedHoldersStructure, key);
  }

  const listOfNonNavigableKeys = canNotNavigateTo(
    sharedHoldersStructure,
    errors
  );

  makeCurrentViewNonNavigableTo(listOfNonNavigableKeys, currentView);

  return combinePathElements(paths, setCurrentView, listOfNonNavigableKeys);
};

export default breadcrumbPath;
