import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './sellTransferActions';
import * as actions from './sellTransferActions';
import Api from "../../service/api";

const { SET } = actionTypes;

/***************************** Sagas ************************************/

function* sellTransferSaga() {
  while (true) {
    const {data} = yield take(SET.REQUEST);
    try {
      const response = yield call(Api.post, '/portfolio/sell_transfer', data);
      if (response.status) {
        yield put(actions.sellTransfer.success());
      } else {
        yield put(actions.sellTransfer.failure());
      }
    } catch (e) {
      yield put(actions.sellTransfer.failure());
    }
  }
}

export default [
  sellTransferSaga,
];
