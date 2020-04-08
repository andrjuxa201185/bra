import { REQUEST } from './action';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* fetchEntity(action, apiFn, ...params) {
  try {
    const {data, error} = yield call(apiFn, ...params);
    if (data) {
      const {resource, items} = data;
      const result = resource || items || data;
      yield put(action.success(result, ...params));
      return result;
    } else {
      yield put(action.failure(error));
    }
  } catch (err) {
    if (action && action.failure) {
      yield put(action.failure(err));
    }
    throw err;
  }
}

export const createSubroutines = operations =>
  Object.keys(operations).reduce((object, key) => {
    const {action, fetch} = operations[key];
    object[key] = fetchEntity.bind(null, action, fetch);
    return object;
  }, {});

export const createWatcher = (actionType, saga, effect) => function* () {
  yield (effect || takeLatest)(actionType[REQUEST], function* (params) {
    try {
      yield saga(params);
    } catch (err) {
      console.warn(`Saga ${err}`);//eslint-disable-line
    }
  });
};

export const createSaga = subroutine => function* saga({onSuccess, ...restParams}) {
  const result = yield call(subroutine, restParams);
  onSuccess && onSuccess(result);
};
