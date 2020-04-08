import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('SELL_TRANSFER', {
    SET: 'SET',
  }),
};

export const sellTransfer = {
  request: data => action(actionTypes.SET[REQUEST], {data}),
  success: payload => action(actionTypes.SET[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET[FAILURE]),
};
