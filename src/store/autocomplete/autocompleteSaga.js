import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './autocompleteActions';
import * as actions from './autocompleteActions';
import Api from "../../service/api";

const {GET_DATA} = actionTypes;

function* autocompleteSaga() {
  while (true) {
    const { path, query } = yield take(GET_DATA.REQUEST);
    try {
      const response = yield call(Api.get, `${path}?search=${query}`);

      if (response.status) {
        yield put(actions.getAutocomplete.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  autocompleteSaga,
];
