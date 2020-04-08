import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('INTERESTS', {
    GET_DATA: 'GET_DATA',
    UPDATE_DATA: 'UPDATE_DATA',
    UPDATE_WEIGHT: 'UPDATE_WEIGHT',
  }),
};

export const getInterests = {
  request: responseId => action(actionTypes.GET_DATA[REQUEST], {responseId}),
  success: payload => action(actionTypes.GET_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DATA[FAILURE]),
};

export const updateInterests = {
  request: (data, responseId) => action(actionTypes.UPDATE_DATA[REQUEST], {data, responseId}),
  success: payload => action(actionTypes.UPDATE_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_DATA[FAILURE]),
};

export const updateWeight = {
  request: (weight, responseId, onSuccess) => action(actionTypes.UPDATE_WEIGHT[REQUEST], {weight, responseId, onSuccess}),
  success: payload => action(actionTypes.UPDATE_WEIGHT[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_WEIGHT[FAILURE]),
};
