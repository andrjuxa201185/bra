import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './folioActions';
import * as actions from './folioActions';
import Api from "../../service/api";

const {
  SET_FOLIO_SIGNATURE,
  CHECK_FOLIO_STATUS,
  GET_BANK_ACCOUNT,
} = actionTypes;

/***************************** Sagas ************************************/
function* setFolioSignatureSaga() {
  while (true) {
    const { payload } = yield take(SET_FOLIO_SIGNATURE.REQUEST);
    try {
      console.log('setFolioSignatureSaga', payload)
      const response = yield call(Api.post, 'app_folio/submit_signature', payload);
      if (response.status) {
        yield put(actions.setFolioSignature.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getFolioStatusSaga() {
  while (true) {
    yield take(CHECK_FOLIO_STATUS.REQUEST);
    try {
      const response = yield call(Api.get, `app_folio/check_status`);
      if (response.status) {
        yield put(actions.checkFolioStatus.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getBankAccountSaga() {
  while (true) {
    yield take(GET_BANK_ACCOUNT.REQUEST);
    try {
      const response = yield call(Api.get, `app_folio/bank_account`);
      if (response.status) {
        yield put(actions.getBankAccount.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  setFolioSignatureSaga,
  getFolioStatusSaga,
  getBankAccountSaga,
];
