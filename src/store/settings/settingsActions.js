import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('SETTINGS', {
    GET_INFO: 'GET_INFO',
  }),
};

export const getSettings = {
  request: () => action(actionTypes.GET_INFO[REQUEST]),
  success: payload => action(actionTypes.GET_INFO[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_INFO[FAILURE]),
};
