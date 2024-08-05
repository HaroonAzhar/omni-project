import findParent from "./findParent";

const findAllParentsToTheRoot = (
  shareholdersStructure,
  maxNavigableParents
) => {
  const notAllowedParents = [];
  for (const maxNavigableParent of maxNavigableParents) {
    const notAllowedParent = findParent(
      shareholdersStructure,
      maxNavigableParent
    );
    if (notAllowedParent) {
      notAllowedParents.push(notAllowedParent);
      notAllowedParents.push(
        ...findAllParentsToTheRoot(shareholdersStructure, notAllowedParents)
      );
    }
  }
  return notAllowedParents;
};

const canNotNavigateTo = (shareholdersStructure, errors) => {
  const shareholdersWithErrorsIds = Object.entries(errors)
    .filter(([_, childErrors]) => Object.keys(childErrors).length > 0)
    .map(([uuid]) => uuid);

  const maxNavigableParents = shareholdersWithErrorsIds.map(
    (childrenWithErrorUuid) =>
      findParent(shareholdersStructure, childrenWithErrorUuid)
  );

  const allParentsOfTheMaxNavigableParent = findAllParentsToTheRoot(
    shareholdersStructure,
    maxNavigableParents
  );
  return [...new Set(allParentsOfTheMaxNavigableParent)];
};

export default canNotNavigateTo;
