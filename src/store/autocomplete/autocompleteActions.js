import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('AUTOCOMPLETE', {
    GET_DATA: 'GET_DATA',
  }),
};

export const getAutocomplete = {
  request: (path, query) => action(actionTypes.GET_DATA[REQUEST], {path, query}),
  success: payload => action(actionTypes.GET_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DATA[FAILURE]),
};
