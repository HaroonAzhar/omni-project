import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import calculatorReducer from "store/calculator/reducer";
import applicationReducer from "store/application/reducer";
import adminReducer from "store/admin";
import userReducer from "store/user";
import caseReducer from "store/case";
import completedReducer from "store/completed";
import dipReducer from "store/dip";
import waypointsReducer from "store/completed/waypoints";
import notesReducer from "store/completed/notes";
import defaultEventsReducer from "store/completed/default_events";
import caseSummaryReducer from "store/case_summary";
import cashflowsReducer from "store/completed/cashflows";
import adjustmentsReducer from "store/completed/adjustments";
import securitiesReducer from "store/completed/securities";
import furtherDrawdownsReducer from "store/completed/further_drawdowns";
import associatedTagsReducer from "store/case/associated_tags";
import estimatedRedemptionsReducer from "store/completed/estimated_redemptions";
import expectedDrawdownsReducer from "store/completed/expected_drawdowns";
import crossCollateralisedLoansReducer from "store/case/cross_collateralised_loans";
import furtherAdvancesReducer from "store/completed/further_advances";

const reducers = combineReducers({
  calculator: calculatorReducer,
  application: applicationReducer,
  admin: adminReducer,
  user: userReducer,
  case: caseReducer,
  completed: completedReducer,
  dip: dipReducer,
  waypoints: waypointsReducer,
  notes: notesReducer,
  defaultEvents: defaultEventsReducer,
  caseSummary: caseSummaryReducer,
  cashflows: cashflowsReducer,
  adjustments: adjustmentsReducer,
  securities: securitiesReducer,
  furtherDrawdowns: furtherDrawdownsReducer,
  associatedTags: associatedTagsReducer,
  estimatedRedemptions: estimatedRedemptionsReducer,
  expectedDrawdowns: expectedDrawdownsReducer,
  crossCollateralisedLoans: crossCollateralisedLoansReducer,
  furtherAdvances: furtherAdvancesReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
