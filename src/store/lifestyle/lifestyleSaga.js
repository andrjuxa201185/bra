import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './lifestyleActions';
import * as actions from './lifestyleActions';
//import {showAlert} from '../alert/alertActions';
import Api from "../../service/api";

const {
  GET_QUESTIONS, SET_ANSWERS,
} = actionTypes;

/***************************** Sagas ************************************/

function* getQuestionsSaga() {
  while (true) {
    yield take(GET_QUESTIONS.REQUEST);
    try {
      const response = yield call(Api.get, 'lifestyle/');
      if (response.status) {
        yield put(actions.getQuestions.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* setAnswersSaga() {
  while (true) {
    const {answers, onSuccess} = yield take(SET_ANSWERS.REQUEST);
    try {
      const response = yield call(Api.put, 'lifestyle/', undefined, answers);

      if (response.status) {
        yield put(actions.setAnswers.success());
        onSuccess();
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getQuestionsSaga,
  setAnswersSaga,
];
