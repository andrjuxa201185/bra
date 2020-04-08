import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './portfolioActions';
import * as actions from './portfolioActions';
import Api from "../../service/api";

const {GET, CREATE, UPDATE, RESET} = actionTypes;

/***************************** Sagas ************************************/

function* createPortfolioSaga() {
  while (true) {
    const {data, onSuccess} = yield take(CREATE.REQUEST);
    try {
      const response = yield call(Api.post, 'portfolio/', data);
      if (response.status) {
        yield put(actions.createPortfolio.success());
        onSuccess();
      } else {
        yield put(actions.createPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.createPortfolio.failure());
    }
  }
}

function* getPortfolioSaga() {
  while (true) {
    const {data} = yield take(GET.REQUEST);
    const param = data ? `?quiz=${data}` : '';

    try {
      const response = yield call(Api.get, `portfolio/${param}`);
      console.log('response', response);
      
      if (response.status) {
        const {portfolio_id, response_id, is_pending, is_rebalance} = response.result;
        yield put(actions.getPortfolio.success({
          ...response.result.data,
          portfolio_id,
          response_id,
          is_pending,
          is_rebalance,
        }));
      } else {
        yield put(actions.getPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.getPortfolio.failure());
    }
  }
}

function* updatePortfolioSaga() {
  while (true) {
    const {data, portfolio_id, onSuccess} = yield take(UPDATE.REQUEST);
    try {
      const response = yield call(Api.put, `portfolio/${portfolio_id}`, undefined, data);
      console.log('response', response);

      if (response.status) {
        const {portfolio_id, response_id} = response.result;
        yield put(actions.updatePortfolio.success({
          ...response.result.data,
          portfolio_id,
          response_id,
        }));
        onSuccess && onSuccess();
      } else {
        yield put(actions.updatePortfolio.failure());
      }
    } catch (e) {
      yield put(actions.updatePortfolio.failure());
    }
  }
}

function* resetPortfolioSaga() {
  while (true) {
    const {portfolioId, onSuccess} = yield take(RESET.REQUEST);
    try {
      const response = yield call(Api.patch, `portfolio/${portfolioId}`, undefined, {action: 'reset_tailored'});
      if (response.status) {
        const {portfolio_id, response_id} = response.result;
        yield put(actions.resetPortfolio.success({
          ...response.result.data,
          portfolio_id,
          response_id,
        }));
        onSuccess && onSuccess();
      } else {
        yield put(actions.resetPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.resetPortfolio.failure());
    }
  }
}

export default [
  createPortfolioSaga,
  getPortfolioSaga,
  updatePortfolioSaga,
  resetPortfolioSaga,
];
