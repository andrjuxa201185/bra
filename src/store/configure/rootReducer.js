import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from '../auth/authReducer';
import alert from '../alert/alertReducer';
import quiz from '../quiz/quizReducer';
import userExplainers from '../userExplainers/userExplainersReducer';
import userProfile from '../userProfile/userProfileReducer';
import portfolio from '../portfolio/portfolioReducer';
import interests from '../interests/interestsReducer';
import categories from '../categories/categoriesReducer';
import library from '../library/libraryReducer';
import autocomplete from '../autocomplete/autocompleteReducer';
import lifestyle from '../lifestyle/lifestyleReducer';
import onboardingQuestion from '../onboardingQuestion/onboardingQuestionReducer';
import onboardingPortfolio from '../onboardingPortfolio/onboardingPortfolioReducer';
import dashboard from '../dashboard/dashboardReducer';
import posts from '../posts/postsReducer';
import settings from '../settings/settingsReducer';
import onboarding from '../onboarding/onboardingReducer';
import onboardingInvest from '../onboardingInvest/onboardingInvestReducer';
import traiderStatus from '../traiderStatus/traiderStatusReducer';
import folioReducer from "../folio/folioReducer";
import referFriendReducer from "../referFriend/referFriendReducer";
import currentPortfolio from "../currentPortfolio/currentPortfolioReducer";
import rebalancePortfolio from "../rebalancePortfolio/rebalancePortfolioReducer";
import transferBuy from "../transferBuy/transferBuyReducer";
import sellTransfer from "../sellTransfer/sellTransferReducer";
import sellPortfolio from "../sellPortfolio/sellPortfolioReducer";
import buyPortfolio from "../buyPortfolio/buyPortfolioReducer";
import cashAccount from "../cashAccount/cashAccountReducer";

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  alert,
  quiz,
  userExplainers,
  userProfile,
  portfolio,
  interests,
  categories,
  library,
  autocomplete,
  lifestyle,
  onboardingQuestion,
  onboardingPortfolio,
  dashboard,
  posts,
  settings,
  onboarding,
  onboardingInvest,
  traiderStatus,
  folioReducer,
  referFriendReducer,
  currentPortfolio,
  rebalancePortfolio,
  transferBuy,
  sellTransfer,
  sellPortfolio,
  buyPortfolio,
  cashAccount,
});
