import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('CURRENT_PORTFOLIO', {
    GET: 'GET',
  }),
};

export const getCurrentPortfolio = {
  request: () => action(actionTypes.GET[REQUEST]),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};
