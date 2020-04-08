import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './onboardingActions';
import * as actions from './onboardingActions';
import Api from "../../service/api";

const {
  GET,
} = actionTypes;

/***************************** Sagas ************************************/

function* getOnboardingSaga() {
  while (true) {
    yield take(GET.REQUEST);
    try {
      const response = yield call(Api.get, `onboarding/`);
      if (response.status) {
        yield put(actions.getOnboarding.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}


export default [
  getOnboardingSaga,
];
