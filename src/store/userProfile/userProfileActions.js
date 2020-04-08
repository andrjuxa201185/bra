import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  GET_FUNDS_HOLDINGS: 'GET_FUNDS_HOLDINGS',
  ...createRequestActionTypes('USER_PROFILE', {
    GET: 'GET',
    EDIT: 'EDIT',
    UPLOAD_AVATAR: 'UPLOAD_AVATAR',
  }),
};

export const getFundsHoldings = callback => action(actionTypes.GET_FUNDS_HOLDINGS, {callback});

export const getUserProfile = {
  request: onSuccess => action(actionTypes.GET[REQUEST], {onSuccess}),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const editUserProfile = {
  request: data => action(actionTypes.EDIT[REQUEST], {data}),
  success: payload => action(actionTypes.EDIT[SUCCESS], {payload}),
  failure: () => action(actionTypes.EDIT[FAILURE]),
};

export const uploadAvatar = {
  request: image => action(actionTypes.UPLOAD_AVATAR[REQUEST], {image}),
  success: payload => action(actionTypes.UPLOAD_AVATAR[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPLOAD_AVATAR[FAILURE]),
};
