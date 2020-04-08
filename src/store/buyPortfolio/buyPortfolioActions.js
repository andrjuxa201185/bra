import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('BUY_PORTFOLIO', {
    SET: 'SET',
  }),
};

export const buyPortfolio = {
  request: data => action(actionTypes.SET[REQUEST], {data}),
  success: payload => action(actionTypes.SET[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET[FAILURE]),
};
