import { useHistory, useParams } from "react-router-dom";

export default (step_id = "assets_and_liabilities") => {
  const { id } = useParams();
  const history = useHistory();
  const applicationHomePagePath = `/application/${id}`;
  const stepHomePagePath = `${applicationHomePagePath}/checklist/${step_id}`;
  const assetsDetailsHomePagePath = `/application/${id}/checklist/assets_and_liabilities/`;

  const goBackToChecklist = () => {
    history.push(applicationHomePagePath);
  };

  const goBackToListOfApplicants = () => {
    history.push(assetsDetailsHomePagePath);
  };

  const goToElementPropertyPortfolioOfElement = (indexOfElement) => {
    history.push(`${stepHomePagePath}/${indexOfElement}/property_portfolio`);
  };

  const goToEditProperty = (indexOfElement, indexOfProperty) => {
    history.push(
      `${stepHomePagePath}/${indexOfElement}/property_portfolio/0/${indexOfProperty}`
    );
  };

  return {
    goBackToChecklist,
    goBackToListOfApplicants,
    goToElementPropertyPortfolioOfElement,
    goToEditProperty,
  };
};
