import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './cashAccountActions';
import * as actions from './cashAccountActions';
import Api from "../../service/api";

const {
  SELL,
  INVEST,
} = actionTypes;

/***************************** Sagas ************************************/

function* cashAccountSellSaga() {
  while (true) {
    const {data} = yield take(SELL.REQUEST);
    try {
      const response = yield call(Api.post, 'portfolio/cash_account_sell', data);
      if (response.status) {
        yield put(actions.cashAccountSell.success());
      } else {
        yield put(actions.cashAccountSell.failure());
      }
    } catch (e) {
      yield put(actions.cashAccountSell.failure());
    }
  }
}

function* cashAccountInvestSaga() {
  while (true) {
    const {data} = yield take(INVEST.REQUEST);
    try {
      const response = yield call(Api.post, 'portfolio/cash_account_invest', data);
      if (response.status) {
        yield put(actions.cashAccountInvest.success());
      } else {
        yield put(actions.cashAccountInvest.failure());
      }
    } catch (e) {
      yield put(actions.cashAccountInvest.failure());
    }
  }
}

export default [
  cashAccountSellSaga,
  cashAccountInvestSaga,
];
