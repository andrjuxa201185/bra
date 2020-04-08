import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './categoriesActions';
import * as actions from './categoriesActions';
import Api from "../../service/api";

const {GET_DATA} = actionTypes;

function* getCategoriesSaga() {
  while (true) {
    yield take(GET_DATA.REQUEST);
    try {
      const response = yield call(Api.get, `additional/brains_category`);
      if (response.status) {
        yield put(actions.getCategories.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getCategoriesSaga,
];
