import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('TRAIDER_STATUS', {
    GET: 'GET',
  }),
};

export const getTraiderStatus = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};
