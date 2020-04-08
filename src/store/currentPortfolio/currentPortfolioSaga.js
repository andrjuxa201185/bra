import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './currentPortfolioActions';
import * as actions from './currentPortfolioActions';
import Api from "../../service/api";

const {GET} = actionTypes;

/***************************** Sagas ************************************/

function* getCurrentPortfolioSaga() {
  while (true) {
    yield take(GET.REQUEST);
    try {
      const response = yield call(Api.get, `portfolio/current_portfolio`);
      if (response.status) {
        console.log('response', response);

        const {total_amount, is_tailored, is_pending, is_rebalance, next_trading_window_at} = response.result;
        yield put(actions.getCurrentPortfolio.success({
          ...response.result.data,
          total_amount,
          is_tailored,
          is_pending,
          is_rebalance,
          next_trading_window_at,
        }));
      } else {
        yield put(actions.getCurrentPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.getCurrentPortfolio.failure());
    }
  }
}

export default [
  getCurrentPortfolioSaga,
];
