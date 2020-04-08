import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './onboardingPortfolioActions';
import * as actions from './onboardingPortfolioActions';
//import {showAlert} from '../alert/alertActions';
import Api from "../../service/api";

const {
  GET_PORTFOLIO, SET_PORTFOLIO,
} = actionTypes;

/***************************** Sagas ************************************/

function* getPortfolioSaga() {
  while (true) {
    yield take(GET_PORTFOLIO.REQUEST);
    try {
      const response = yield call(Api.get, `onboarding/folio_account`);
      if (response.status) {
        yield put(actions.getPortfolio.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* setPortfolioSaga() {
  while (true) {
    const {answers, onSuccess} = yield take(SET_PORTFOLIO.REQUEST);
    try {
      const response = yield call(Api.put, 'onboarding/folio_account/', undefined, answers);

      if (response.status) {
        yield put(actions.setPortfolio.success(response.result));
        onSuccess();
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getPortfolioSaga,
  setPortfolioSaga,
];
