import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './quizActions';
import * as actions from './quizActions';
import * as userActions from '../userProfile/userProfileActions';
//import {showAlert} from '../alert/alertActions';
import Api from "../../service/api";

const {
  GET_DEEP, UPDATE_DEEP, GET_EXPRESS,
  UPDATE_EXPRESS, GET_EXPERT, UPDATE_EXPERT,
} = actionTypes;

/***************************** Sagas ************************************/

function* getDeepQuizSaga() {
  while (true) {
    yield take(GET_DEEP.REQUEST);
    try {
      const response = yield call(Api.get, `quiz/deep_dive/`);

      if (response.status) {
        yield put(actions.getDeepQuiz.success(response.result));
        // if (response.result.quiz_changed && response.msg) {
        //   yield put(showAlert({title: 'Warning', msg: response.msg}));
        // }
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* updateDeepQuizSaga() {
  while (true) {
    const {data, responseId, onSuccess} = yield take(UPDATE_DEEP.REQUEST);
    try {
      const response = yield call(Api.put, `quiz/deep_dive/${responseId}`, undefined, data);
      if (response.status) {
        yield put(actions.updateDeepQuiz.success(response.result));
        yield put(userActions.getUserProfile.request());
        onSuccess(response.result.user_progress);
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getExpressQuizSaga() {
  while (true) {
    yield take(GET_EXPRESS.REQUEST);
    try {
      const response = yield call(Api.get, `quiz/express/`);

      if (response.status) {
        yield put(actions.getExpressQuiz.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* updateExpressQuizSaga() {
  while (true) {
    const {data, responseId, onSuccess} = yield take(UPDATE_EXPRESS.REQUEST);
    try {
      const response = yield call(Api.put, `quiz/express/${responseId}`, undefined, data);

      if (response.status) {
        yield put(actions.updateExpressQuiz.success(response.result));
        yield put(userActions.getUserProfile.request());
        onSuccess(response.result.thank_page);
        //onSuccess(response.result.user_progress);
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getExpertQuizSaga() {
  while (true) {
    yield take(GET_EXPERT.REQUEST);
    try {
      const response = yield call(Api.get, `quiz/expert/`);
      if (response.status) {
        console.log(response.result)
        yield put(actions.getExpertQuiz.success(response.result));
        // if (response.result.quiz_changed && response.msg) {
        //   yield put(showAlert({title: 'Warning', msg: response.msg}));
        // }
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* updateExpertQuizSaga() {
  while (true) {
    const {data, responseId, onSuccess} = yield take(UPDATE_EXPERT.REQUEST);
    try {
      const response = yield call(Api.put, `quiz/expert/${responseId}`, undefined, data);
      if (response.status) {
        yield put(actions.updateExpertQuiz.success(response.result));
        yield put(userActions.getUserProfile.request());
        onSuccess(response.result.thank_page);
        //onSuccess(response.result.user_progress);
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getDeepQuizSaga,
  updateDeepQuizSaga,
  getExpressQuizSaga,
  updateExpressQuizSaga,
  getExpertQuizSaga,
  updateExpertQuizSaga,
];
