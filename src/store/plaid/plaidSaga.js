import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './plaidActions';
import * as actions from './plaidActions';
import Api from "../../service/api";

const { SET_INFO } = actionTypes;

/***************************** Sagas ************************************/
function* setPlaidDataSaga() {
  while (true) {
    const { payload } = yield take(SET_INFO.REQUEST);
    try {
      const response = yield call(Api.put, 'onboarding/folio_bank_link', undefined, payload);
      if (response.status) {
        yield put(actions.setPlaidInfo.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  setPlaidDataSaga,
];
