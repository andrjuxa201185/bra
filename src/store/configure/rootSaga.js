import { all, fork, setContext } from 'redux-saga/effects';
import authSaga from '../auth/authSaga';
import quizSaga from '../quiz/quizSaga';
import userProfileSaga from '../userProfile/userProfileSaga';
import interestsSaga from '../interests/interestsSaga';
import portfolioSaga from '../portfolio/portfolioSaga';
import categoriesSaga from '../categories/categoriesSaga';
import librarySaga from '../library/librarySaga';
import autocompleteSaga from '../autocomplete/autocompleteSaga';
import lifestyleSaga from '../lifestyle/lifestyleSaga';
import onboardingQuestion from '../onboardingQuestion/onboardingQuestionSaga';
import onboardingPortfolio from '../onboardingPortfolio/onboardingPortfolioSaga';
import dashboardSaga from '../dashboard/dashboardSaga';
import postsSaga from '../posts/postsSaga';
import plaidSaga from '../plaid/plaidSaga';
import settingsSaga from '../settings/settingsSaga';
import onboardingSaga from '../onboarding/onboardingSaga';
import onboardingInvestSaga from '../onboardingInvest/onboardingInvestSaga';
import traiderStatusSaga from '../traiderStatus/traiderStatusSaga';
import setFolioSaga from '../folio/folioSaga';
import referFriendSaga from '../referFriend/referFriendSaga';
import currentPortfolioSaga from '../currentPortfolio/currentPortfolioSaga';
import rebalancePortfolioSaga from '../rebalancePortfolio/rebalancePortfolioSaga';
import transferBuySaga from '../transferBuy/transferBuySaga';
import sellTransferSaga from '../sellTransfer/sellTransferSaga';
import sellPortfolioSaga from '../sellPortfolio/sellPortfolioSaga';
import buyPortfolioSaga from '../buyPortfolio/buyPortfolioSaga';
import cashAccountSaga from "../cashAccount/cashAccountSaga";


export default function* root(dispatch) {
  yield setContext({dispatch});
  yield all([
    ...authSaga,
    ...quizSaga,
    ...userProfileSaga,
    ...portfolioSaga,
    ...interestsSaga,
    ...categoriesSaga,
    ...librarySaga,
    ...autocompleteSaga,
    ...lifestyleSaga,
    ...onboardingQuestion,
    ...onboardingPortfolio,
    ...dashboardSaga,
    ...postsSaga,
    ...plaidSaga,
    ...settingsSaga,
    ...onboardingSaga,
    ...onboardingInvestSaga,
    ...traiderStatusSaga,
    ...setFolioSaga,
    ...referFriendSaga,
    ...currentPortfolioSaga,
    ...rebalancePortfolioSaga,
    ...transferBuySaga,
    ...sellTransferSaga,
    ...sellPortfolioSaga,
    ...buyPortfolioSaga,
    ...cashAccountSaga,
  ].map(saga => fork(saga, dispatch)));
}
