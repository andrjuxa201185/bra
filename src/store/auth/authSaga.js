import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './authActions';
import * as actions from './authActions';
import {getUserProfile} from '../userProfile/userProfileActions';
import {showAlert} from '../alert/alertActions';
import { logout } from "./authActions";
import Auth from '../../service/auth';
import Api from "../../service/api";
import {filterActionsForRequest} from '../../helpers/common';
import { globals } from "../globals";
import {
  AFTER_REGISTRATION,
  WORLD_VIEW,
  INVITE_CHECK_MAIL,
  //FORCE_LOGIN
} from '../../navigation/routes';

const {LOGIN, GUEST_LOGIN, FORCE_LOGIN, FORGOT_PASSWORD, REGISTRATION,
  VERIFICATION, RESEND_CONFIRMATION_EMAIL} = actionTypes;

/***************************** Sagas ************************************/

function* loginSaga() {
  while (true) {
    const {data} = yield take(LOGIN.REQUEST);
    const formattedData = {
      ...data,
      username: data.email,
    };
    delete formattedData.email;

    try {
      const response = yield call(Auth.getToken, formattedData);
      if (response.access_token) {
        yield put(actions.login.success(response));
        yield put(getUserProfile.request());

      } else {
        yield put(showAlert({title: 'Error', msg: 'Member name or password is wrong'}));
      }
    } catch (e) {
      yield put(showAlert({title: 'Error', msg: 'Member name or password is wrong'}));
    }
  }
}

function* guestLoginSaga() {
  while (true) {
    const {data: {firstName, lastName, email, password, repeat_password}} = yield take(GUEST_LOGIN.REQUEST);
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: repeat_password,
    };
    try {
      const response = yield call(Api.post, 'entry/sign_up_guest_book', userData);
      if (response.status) {
        if (response.result.token_details) {
          yield put(actions.guestLogin.success(response.result.token_details));
          globals.history.push(WORLD_VIEW);
        } else {
          globals.history.push(INVITE_CHECK_MAIL);
        }
        //yield put(getUserProfile.request());
      } else {
        yield put(actions.guestLogin.failure());
      }
    } catch (e) {
      if (e.response.data && e.response.data.errors && e.response.data.errors.email && !e.response.data.errors.email[0].includes('required')) {
        yield put(showAlert({title: 'Error', msg: e.response.data.errors.email[0]}));
      }
      // yield put(showAlert({title: 'Error', msg: 'Email has already registered, please choose another one.'}));
      console.error(e);
      // yield put(actions.guestLogin.failure(e));
    }
  }
}

function* forceLoginSaga() {
  while (true) {
    const {data: {uuid_hash}} = yield take(FORCE_LOGIN.REQUEST);
    try {
      const response = yield call(Api.get, `entry/force_login/${uuid_hash}`);
      if (response.status) {
        if (response.result.token_details) {
          yield put(actions.forceLogin.success(response.result.token_details));
          yield put(getUserProfile.request());
          globals.history.push(WORLD_VIEW);
        } else {
          globals.history.push(INVITE_CHECK_MAIL);
        }
      } else {
        yield put(actions.forceLogin.failure());
      }
    } catch (e) {
      yield put(showAlert({title: 'Error', msg: 'Some Force Login Error'}));
      yield put(actions.forceLogin.failure(e));
    }
  }
}

function* registrationSaga() {
  while (true) {
    const {data: {firstName, lastName, email, password, repeat_password}, onSuccess} = yield take(REGISTRATION.REQUEST);
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm_password: repeat_password,
    };

    try {
      const response = yield call(Api.post, 'entry/sign_up_member', userData);
      console.log('response', response);

      if (response.status) {
        // if (response.result && response.result.token_details) {
        //   yield put(actions.registration.success(response.result.token_details));
        //   onSuccess && onSuccess();
        //   return;
        // }

        yield put(actions.registration.success({email}));
        onSuccess && onSuccess();
        globals.history.push(INVITE_CHECK_MAIL);
      }
    } catch (e) {
      const errors = Object.values(e.response.data.errors);
      if (errors.length) {
        yield put(showAlert({title: 'Error', msg: errors[0]}));
      } else {
        yield put(showAlert({title: 'Error', msg: 'Something wrong with connection'}));
      }
      //yield put(actions.registration.failure(e));
    }
  }
}

function* verificationSaga() {
  while (true) {
    const {data: {hash}} = yield take(VERIFICATION.REQUEST);
    const data = {
      hash: hash,
    };
    try {
      const response = yield call(Api.post, 'entry/user_verification', data);
      if (response.status) {
        const token = Auth.getTokenFromLocalStorage();
        if (token) {
          yield put(logout());
        }
        yield put(actions.verification.success(response.result.token_details));
        //yield put(getUserProfile.request());
        globals.history.push(AFTER_REGISTRATION);
      }
    } catch (e) {
      // yield put(actions.registration.failure(e));
    }
  }
}

function* reSendConfirmationEmailSaga() {
  while (true) {
    yield take(RESEND_CONFIRMATION_EMAIL.REQUEST);
    const data = {
      email: localStorage.getItem('email'),
    };
    try {
      yield call(Api.post, 'entry/resend_confirmation', data);
    } catch (e) {
      console.warn(e.response.data.msg);
    }
  }
}

function* forgotPasswordSaga() {
  while (true) {
    const {data, onSuccess} = yield take(FORGOT_PASSWORD);

    try {
      const response = yield call(Api.post, 'entry/forgot_password', {
        ...data,
      });
      if (response.status) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (e) {
      console.warn('error -> ', e.message);//eslint-disable-line
    }
  }
}

function* changePasswordSaga() {
  while (true) {
    const {data, onSuccess} = yield take(actionTypes.CHANGE_PASSWORD);
    try {
      const response = yield call(Api.post, 'entry/set_forgot_password', data);
      if (response.status) {
        onSuccess();
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* rememberLastTenActions() {
  while (true) {
    const action = yield take('*');
    const targetAction = yield call(filterActionsForRequest, action.type);
    if (targetAction) {
      const [sameAction] = Api.actionsStack.filter(item => item.type === action.type);
      if (!sameAction) {
        if (Api.actionsStack.length === 10) {
          Api.actionsStack.shift();
        }
        Api.actionsStack.push(action);
      }
    }
  }
}

export default [
  guestLoginSaga,
  forceLoginSaga,
  loginSaga,
  forgotPasswordSaga,
  changePasswordSaga,
  registrationSaga,
  verificationSaga,
  rememberLastTenActions,
  reSendConfirmationEmailSaga,
];
