import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './interestsActions';
import * as actions from './interestsActions';
import Api from "../../service/api";

const {GET_DATA, UPDATE_DATA, UPDATE_WEIGHT} = actionTypes;

/***************************** Sagas ************************************/

function* getInterestsSaga() {
  while (true) {
    const {responseId} =yield take(GET_DATA.REQUEST);
    try {
      const response = yield call(Api.get, `interests/${responseId ? responseId: ''}`);
      if (response.status) {
        yield put(actions.getInterests.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line

    }
  }
}

function* updateInterestsSaga() {
  while (true) {
    const {data, responseId} = yield take(UPDATE_DATA.REQUEST);

    try {
      const response = yield call(Api.put, `interests/${responseId}`, undefined, data);
      if (response.status) {
        yield put(actions.updateInterests.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* updateWeightSaga() {
  while (true) {
    const {weight, responseId, onSuccess} = yield take(UPDATE_WEIGHT.REQUEST);

    try {
      const response = yield call(Api.put, `interests/${responseId}/weight`, undefined, weight);
      if (response.status) {
        yield put(actions.updateWeight.success(response.result));
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getInterestsSaga,
  updateInterestsSaga,
  updateWeightSaga,
];
