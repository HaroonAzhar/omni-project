import { createSelector } from "reselect";

export const getCompleted = (state) => state.completed || {};

export const getDateOfCompletion = createSelector(
  [getCompleted],
  (completed) => completed.DateOfCompletion
);

export const getApplication = (state) => state.application || {};
