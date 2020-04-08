import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('LIFESTYLE', {
    GET_QUESTIONS: 'GET_QUESTIONS',
    SET_ANSWERS: 'SET_ANSWERS',
  }),
};

export const getQuestions = {
  request: () => action(actionTypes.GET_QUESTIONS[REQUEST]),
  success: payload => action(actionTypes.GET_QUESTIONS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_QUESTIONS[FAILURE]),
};

export const setAnswers = {
  request: (answers, onSuccess) => action(actionTypes.SET_ANSWERS[REQUEST], {answers, onSuccess}),
  success: payload => action(actionTypes.SET_ANSWERS[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_ANSWERS[FAILURE]),
};
