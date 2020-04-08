import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('ONBOARDINGPORTFOLIO', {
    GET_PORTFOLIO: 'GET_PORTFOLIO',
    SET_PORTFOLIO: 'SET_PORTFOLIO',
  }),
};

export const getPortfolio = {
  request: () => action(actionTypes.GET_PORTFOLIO[REQUEST]),
  success: payload => action(actionTypes.GET_PORTFOLIO[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_PORTFOLIO[FAILURE]),
};

export const setPortfolio = {
  request: (answers, onSuccess) => action(actionTypes.SET_PORTFOLIO[REQUEST], {answers, onSuccess}),
  success: payload => action(actionTypes.SET_PORTFOLIO[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_PORTFOLIO[FAILURE]),
};
