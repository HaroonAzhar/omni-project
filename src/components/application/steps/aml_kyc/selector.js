import { createSelector } from "reselect";

import { getUserEmail } from "hooks/use_user";

export const getUserName = getUserEmail;

export const getIsMlro = createSelector(
  [getUserName],
  (userName) =>
    process.env.REACT_APP_MLROS &&
    process.env.REACT_APP_MLROS.includes(userName)
);
