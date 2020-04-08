import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('CATEGORIES', {
    GET_DATA: 'GET_DATA',
  }),
};

export const getCategories = {
  request: () => action(actionTypes.GET_DATA[REQUEST]),
  success: payload => action(actionTypes.GET_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DATA[FAILURE]),
};
