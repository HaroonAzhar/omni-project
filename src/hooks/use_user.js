import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const getUser = (state) => state.user || {};

export const getUserEmail = createSelector([getUser], (user) => user.email);

const useUser = () => {
  return useSelector(getUserEmail);
};

export default useUser;
