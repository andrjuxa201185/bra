import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './sellPortfolioActions';
import * as actions from './sellPortfolioActions';
import Api from "../../service/api";

const { SET } = actionTypes;

/***************************** Sagas ************************************/

function* sellPortfolioSaga() {
  while (true) {
    const {data} = yield take(SET.REQUEST);
    try {
      const response = yield call(Api.post, '/portfolio/sell', data);
      if (response.status) {
        yield put(actions.sellPortfolio.success());
      } else {
        yield put(actions.sellPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.sellPortfolio.failure());
    }
  }
}

export default [
  sellPortfolioSaga,
];
