import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './buyPortfolioActions';
import * as actions from './buyPortfolioActions';
import Api from "../../service/api";

const { SET } = actionTypes;

/***************************** Sagas ************************************/

function* buyPortfolioSaga() {
  while (true) {
    const {data} = yield take(SET.REQUEST);
    try {
      const response = yield call(Api.post, 'portfolio/buy', data);
      if (response.status) {
        yield put(actions.buyPortfolio.success());
      } else {
        yield put(actions.buyPortfolio.failure());
      }
    } catch (e) {
      yield put(actions.buyPortfolio.failure());
    }
  }
}

export default [
  buyPortfolioSaga,
];
