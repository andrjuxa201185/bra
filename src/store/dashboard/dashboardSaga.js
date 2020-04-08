import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './dashboardActions';
import * as actions from './dashboardActions';
//import {showAlert} from '../alert/alertActions';
import Api from "../../service/api";

const {
  GET_ASSESSMENTS, GET_OUTLOOK, GET_ACTIVITIES,
} = actionTypes;

/***************************** Sagas ************************************/

function* getAssessmentsSaga() {
  while (true) {
    yield take(GET_ASSESSMENTS.REQUEST);
    try {
      const response = yield call(Api.get, `dashboard/assessments/`);

      if (response.status) {
        yield put(actions.getAssessments.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getOutlookSaga() {
  while (true) {
    yield take(GET_OUTLOOK.REQUEST);
    try {
      const response = yield call(Api.get, `dashboard/outlook_meter/`);
      if (response.status) {
        yield put(actions.getOutlook.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getActivitiesSaga() {
  while (true) {
    const {payload} = yield take(GET_ACTIVITIES.REQUEST);
    console.log(payload);
    try {
      const response = yield call(Api.post, '/app_folio/get_account_transactions', payload);
      if (response.status) {
        yield put(actions.getActivities.success(response.result));
      } else {
        yield put(actions.getActivities.failure());
      }
    } catch (e) {
      yield put(actions.getActivities.failure());
    }
  }
}


export default [
  getAssessmentsSaga,
  getOutlookSaga,
  getActivitiesSaga,
];
