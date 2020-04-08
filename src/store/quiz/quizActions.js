import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('QUIZ', {
    GET_DEEP: 'GET_DEEP',
    UPDATE_DEEP: 'UPDATE_DEEP',
    GET_EXPRESS: 'GET_EXPRESS',
    UPDATE_EXPRESS: 'UPDATE_EXPRESS',
    GET_EXPERT: 'GET_EXPERT',
    UPDATE_EXPERT: 'UPDATE_EXPERT',
  }),
};

export const getDeepQuiz = {
  request: () => action(actionTypes.GET_DEEP[REQUEST]),
  success: payload => action(actionTypes.GET_DEEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DEEP[FAILURE]),
};

export const updateDeepQuiz = {
  request: (data, responseId, onSuccess) => action(actionTypes.UPDATE_DEEP[REQUEST], {data, responseId, onSuccess}),
  success: payload => action(actionTypes.UPDATE_DEEP[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_DEEP[FAILURE]),
};

export const getExpressQuiz = {
  request: () => action(actionTypes.GET_EXPRESS[REQUEST]),
  success: payload => action(actionTypes.GET_EXPRESS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_EXPRESS[FAILURE]),
};

export const updateExpressQuiz = {
  request: (data, responseId, onSuccess) => action(actionTypes.UPDATE_EXPRESS[REQUEST], {data, responseId, onSuccess}),
  success: payload => action(actionTypes.UPDATE_EXPRESS[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_EXPRESS[FAILURE]),
};

export const getExpertQuiz = {
  request: () => action(actionTypes.GET_EXPERT[REQUEST]),
  success: payload => action(actionTypes.GET_EXPERT[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_EXPERT[FAILURE]),
};

export const updateExpertQuiz = {
  request: (data, responseId, onSuccess) => action(actionTypes.UPDATE_EXPERT[REQUEST], {data, responseId, onSuccess}),
  success: payload => action(actionTypes.UPDATE_EXPERT[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_EXPERT[FAILURE]),
};
