import { createSelector } from "reselect";

import getAssetsAndLiabilitiesFromIndividual from "./get_assets_and_liabilities_from_individual";

const getIndividuals = (state) =>
  state.application && state.application.individuals;

const selectAssetsAndLiabilities = createSelector(
  [getIndividuals],
  (individuals = []) => getAssetsAndLiabilitiesFromIndividual(individuals)
);

export default selectAssetsAndLiabilities;
