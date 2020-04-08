import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './rebalancePortfolioActions';
import * as actions from './rebalancePortfolioActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";

const { SET } = actionTypes;

/***************************** Sagas ************************************/

function* rebalancePortfolioSaga() {
  while (true) {
    const {data} = yield take(SET.REQUEST);
    const isTailored = data.is_tailored;
    try {
      const data = {}
      const response = yield call(Api.post, `/portfolio/rebalance?is_tailored=${isTailored}`, data);
      if (response.status) {
        yield put(actions.rebalancePortfolio.success());
        yield put(showAlert({title: 'Success', msg: 'Current mix successfully changed!'}));
      } else {
        yield put(actions.rebalancePortfolio.failure());
      }
    } catch (e) {
      yield put(actions.rebalancePortfolio.failure());
    }
  }
}


export default [
  rebalancePortfolioSaga,
];
