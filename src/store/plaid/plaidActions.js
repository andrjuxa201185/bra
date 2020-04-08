import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('PLAID_INFO', {
    SET_INFO: 'SET_INFO',
  }),
};

export const setPlaidInfo = {
  request: payload => action(actionTypes.SET_INFO[REQUEST], {payload}),
  success: payload => action(actionTypes.SET_INFO[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_INFO[FAILURE]),
};
