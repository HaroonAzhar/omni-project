import { useRouteFlowNavigation } from "hooks";

const amlText = "aml_kyc";
const useAmlKycPaths = () => {
  const { getPathToFlow } = useRouteFlowNavigation();

  const getHomeScreenPath = () =>
    `${getPathToFlow(amlText).split(amlText)[0]}${amlText}`;
  return {
    getHomeScreenPath,
    getReferralPath: (applicantIndex) =>
      `${getHomeScreenPath()}/referral/${applicantIndex}`,
    getValidationPath: () => `${getHomeScreenPath()}/validate`,
  };
};

export default useAmlKycPaths;
