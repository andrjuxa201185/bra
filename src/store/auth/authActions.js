import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  //REFRESH_TOKEN: 'REFRESH_TOKEN',
  LOGOUT: 'LOGOUT',
  // VERIFICATION: 'VERIFICATION',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  ...createRequestActionTypes('AUTH', {
    LOGIN: 'LOGIN',
    VERIFICATION: 'VERIFICATION',
    GUEST_LOGIN: 'GUEST_LOGIN',
    FORCE_LOGIN: 'FORCE_LOGIN',
    REGISTRATION: 'REGISTRATION',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    RESEND_CONFIRMATION_EMAIL: 'RESEND_CONFIRMATION_EMAIL',
  }),
};

//export const refreshToken = payload => action(actionTypes.REFRESH_TOKEN, {payload});
export const logout = () => action(actionTypes.LOGOUT);
export const forgotPassword = (data, onSuccess) => action(actionTypes.FORGOT_PASSWORD, {data, onSuccess});

export const changePassword = (data, onSuccess) => action(actionTypes.CHANGE_PASSWORD, {data, onSuccess});

export const login = {
  request: data => action(actionTypes.LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.LOGIN[FAILURE]),
};

export const guestLogin = {
  request: data => action(actionTypes.GUEST_LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.GUEST_LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.GUEST_LOGIN[FAILURE]),
};

export const forceLogin = {
  request: data => action(actionTypes.FORCE_LOGIN[REQUEST], {data}),
  success: payload => action(actionTypes.FORCE_LOGIN[SUCCESS], {payload}),
  failure: () => action(actionTypes.FORCE_LOGIN[FAILURE]),
};

export const registration = {
  request: (data, onSuccess) => action(actionTypes.REGISTRATION[REQUEST], {data, onSuccess}),
  // verification: data => action(actionTypes.VERIFICATION, {data}),
  success: payload => action(actionTypes.REGISTRATION[SUCCESS], {payload}),
  failure: () => action(actionTypes.REGISTRATION[FAILURE]),
};

export const verification = {
  request: data => action(actionTypes.VERIFICATION[REQUEST], {data}),
  success: payload => action(actionTypes.VERIFICATION[SUCCESS], {payload}),
  failure: () => action(actionTypes.VERIFICATION[FAILURE]),
};

export const reSendConfirmationEmail = {
  request: (data, onSuccess) => action(actionTypes.RESEND_CONFIRMATION_EMAIL[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.RESEND_CONFIRMATION_EMAIL[SUCCESS], {payload}),
  failure: () => action(actionTypes.RESEND_CONFIRMATION_EMAIL[FAILURE]),
};

export const refreshToken = {
  request: () => action(actionTypes.REFRESH_TOKEN[REQUEST]),
  success: payload => action(actionTypes.REFRESH_TOKEN[SUCCESS], {payload}),
  failure: () => action(actionTypes.REFRESH_TOKEN[FAILURE]),
};
