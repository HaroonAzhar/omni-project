import { useUser } from "hooks";

const useUserSigned = () => {
  if (useUser()) {
    return true;
  }
  return false;
};

export default useUserSigned;
