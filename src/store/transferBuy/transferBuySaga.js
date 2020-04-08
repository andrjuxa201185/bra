import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './transferBuyActions';
import * as actions from './transferBuyActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";

const { SET } = actionTypes;

/***************************** Sagas ************************************/

function* transferBuySaga() {
  while (true) {
    const {data} = yield take(SET.REQUEST);
    try {
      const response = yield call(Api.post, 'portfolio/transfer_buy', data);
      if (response.status) {
        yield put(actions.transferBuy.success());
      } else {
        yield put(actions.transferBuy.failure());
        yield put(showAlert({title: 'Error', msg: response.msg.text}));
      }
    } catch (e) {
      yield put(actions.transferBuy.failure());

    }
  }
}

export default [
  transferBuySaga,
];
