import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './traiderStatusActions';
import * as actions from './traiderStatusActions';
import Api from "../../service/api";

const {
  GET,
} = actionTypes;

/***************************** Sagas ************************************/

function* getTraiderStatusSaga() {
  while (true) {
    yield take(GET.REQUEST);
    try {
      const response = yield call(Api.get, `app_folio/check_status`);
      if (response.status) {
        yield put(actions.getTraiderStatus.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}


export default [
  getTraiderStatusSaga,
];
