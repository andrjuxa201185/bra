import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('REFER_FRIEND', {
    SET_INFO: 'SET_INFO',
  }),
};

export const setReferFriendInfo = {
  request: payload => action(actionTypes.SET_INFO[REQUEST], {payload}),
  success: payload => action(actionTypes.SET_INFO[SUCCESS], {payload}),
  failure: payload => action(actionTypes.SET_INFO[FAILURE], {payload}),
};
