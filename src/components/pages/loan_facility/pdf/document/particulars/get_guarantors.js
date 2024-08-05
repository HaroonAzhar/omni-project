import { makeLinearFromTree } from "components/application/steps/company_structure/form_1/helpers";

const getGuarantors = ({ individuals, company }) => {
  const { directors = [], shared_holders = [] } = company[0] ?? {};

  const [entriesDetails] = makeLinearFromTree(shared_holders);
  const flatShareholders = Object.values(entriesDetails);

  const combinedDirectorsShareholders = [...directors, ...flatShareholders];
  const directorSharedHolderLinks = combinedDirectorsShareholders.map(
    (directorSharedHolder) => directorSharedHolder.links
  );

  const getMatchingByLinkDirectorShareholder = ({ links }) => {
    const directorSharedHolderIndex = directorSharedHolderLinks.indexOf(links);
    if (directorSharedHolderIndex !== -1) {
      return combinedDirectorsShareholders[directorSharedHolderIndex];
    } else {
      return {};
    }
  };

  const isGuarantor = (individual) => {
    const matchedDirectorShareholder = getMatchingByLinkDirectorShareholder(
      individual
    );
    return matchedDirectorShareholder.is_guarantor;
  };

  const guarantors = individuals.filter(isGuarantor);

  return guarantors;
};

export default getGuarantors;
