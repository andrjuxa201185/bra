import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('CASH_ACCOUNT', {
    SELL: 'SELL',
    INVEST: 'INVEST',
  }),
};

export const cashAccountSell = {
  request: data => action(actionTypes.SELL[REQUEST], {data}),
  success: payload => action(actionTypes.SELL[SUCCESS], {payload}),
  failure: () => action(actionTypes.SELL[FAILURE]),
};

export const cashAccountInvest = {
  request: data => action(actionTypes.INVEST[REQUEST], {data}),
  success: payload => action(actionTypes.INVEST[SUCCESS], {payload}),
  failure: () => action(actionTypes.INVEST[FAILURE]),
};
