import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './referFriendActions';
import * as actions from './referFriendActions';
import Api from "../../service/api";

const { SET_INFO } = actionTypes;

/***************************** Sagas ************************************/
function* setReferFriendSaga() {
  while (true) {
    const { payload } = yield take(SET_INFO.REQUEST);
    try {
      const response = yield call(Api.post, 'additional/referral/', payload);
      if (response.status) {
        yield put(actions.setReferFriendInfo.success(response));
      }
    } catch (e) {
      yield put(actions.setReferFriendInfo.failure({response: e.response.data}));
      console.log(e.response.data);
    }
  }
}

export default [
  setReferFriendSaga,
];
