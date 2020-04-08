import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './userProfileActions';
import * as actions from './userProfileActions';
import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";

const {GET, EDIT, UPLOAD_AVATAR, GET_FUNDS_HOLDINGS} = actionTypes;

/***************************** Sagas ************************************/

function* getUserProfileSaga() {
  while (true) {
    const {onSuccess} = yield take(GET.REQUEST);
    try {
      const response = yield call(Api.get, `profile/details`);
      if (response.status) {
        const data = {...response.result.user, ...response.result.user.profile};
        delete data.profile;
        yield put(actions.getUserProfile.success(data));
        onSuccess && onSuccess(data.current_quiz);
      } else {
        yield put(actions.getUserProfile.failure());
      }
    } catch (e) {
      yield put(actions.getUserProfile.failure());
    }
  }
}

function* editUserProfileSaga() {
  while (true) {
    const {data} = yield take(EDIT.REQUEST);
    let requestData = {};

    if (data.firstName) {
      requestData.first_name = data.firstName;
    } else if (data.lastName) {
      requestData.last_name = data.lastName;
    } else {
      requestData = {...data};
    }

    let params = '';
    Object.keys(requestData).forEach(key => {
      params += `${key}=${requestData[key]}&`;
    });
    params = params.slice(0, -1);

    try {
      const response = yield call(Api.put, `profile/details?${params}`);
      if (response.status) {
        const data = {...response.result.user, ...response.result.user.profile};
        delete data.profile;
        yield put(actions.editUserProfile.success(data));
        yield put(showAlert({title: 'Success', msg: response.msg.text}));
      } else {
        yield put(actions.editUserProfile.failure());
        yield put(showAlert({title: 'Error', msg: response.msg.text}));
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.editUserProfile.failure());
      yield put(showAlert({title: 'Error', msg: Object.values(response.data.errors)[0]}));
    }
  }
}

function* uploadAvatarSaga() {
  while (true) {
    const {image} = yield take(UPLOAD_AVATAR.REQUEST);

    try {
      const response = yield call(Api.uploadImage, 'profile/details', 'POST', image);
      if (response.status) {
        const data = {...response.result.user, ...response.result.user.profile};
        delete data.profile;
        yield put(actions.uploadAvatar.success(data));
        // yield put(showAlert({title: 'Success', msg: response.msg}));
      } else {
        yield put(actions.uploadAvatar.failure());
        //yield put(showAlert({title: 'Error', msg: response.msg}));
      }
    } catch (e) {
      yield put(actions.uploadAvatar.failure());
    }
  }
}

function* getFundsHoldingsSaga() {
  while (true) {
    const {callback} = yield take(GET_FUNDS_HOLDINGS);

    try {
      const response = yield call(Api.get, 'additional/funds_holdings');
      if (response.status) {
        callback({data: response.result, isSuccess: true});
        // yield put(showAlert({title: 'Success', msg: response.msg}));
      } else {
        callback({isSuccess: false});
      }
    } catch (e) {
      callback({isSuccess: false});
    }
  }
}

export default [
  getUserProfileSaga,
  editUserProfileSaga,
  uploadAvatarSaga,
  getFundsHoldingsSaga,
];
