import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('TRANSFER_BUY', {
    SET: 'SET',
  }),
};

export const transferBuy = {
  request: data => action(actionTypes.SET[REQUEST], {data}),
  success: payload => action(actionTypes.SET[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET[FAILURE]),
};
