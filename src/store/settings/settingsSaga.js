import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './settingsActions';
import * as actions from './settingsActions';
import Api from "../../service/api";

const { GET_INFO } = actionTypes;

/***************************** Sagas ************************************/
function* getSettingsSaga() {
  while (true) {
    yield take(GET_INFO.REQUEST);
    try {
      const response = yield call(Api.get, 'additional/settings/');
      if (response.status) {
        console.log(response.result)
        yield put(actions.getSettings.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getSettingsSaga,
];
