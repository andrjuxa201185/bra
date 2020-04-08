import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('ONBOARDING', {
    GET: 'GET',
  }),
};

export const getOnboarding = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};
