import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './onboardingInvestActions';
import * as actions from './onboardingInvestActions';
import Api from "../../service/api";

const {
  GET,
  SET,
} = actionTypes;

/***************************** Sagas ************************************/

function* getOnboardingInvestSaga() {
  while (true) {
    yield take(GET.REQUEST);
    try {
      const response = yield call(Api.get, `onboarding/page_2/`);
      if (response.status) {
        yield put(actions.getOnboardingInvest.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* setOnboardingInvestSaga() {
  while (true) {
    const {answers} = yield take(SET.REQUEST);
    try {
      const response = yield call(Api.put, 'onboarding/page_2/', undefined, answers);

      if (response.status) {
        yield put(actions.setOnboardingInvest.success());
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}


export default [
  getOnboardingInvestSaga,
  setOnboardingInvestSaga,
];
