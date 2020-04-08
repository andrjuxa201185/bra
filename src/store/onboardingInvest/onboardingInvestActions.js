import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('ONBOARDING_INVEST', {
    GET: 'GET',
    SET: 'SET',
  }),
};

export const getOnboardingInvest = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const setOnboardingInvest = {
  request: answers => action(actionTypes.SET[REQUEST], {answers}),
  success: payload => action(actionTypes.SET[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET[FAILURE]),
};
