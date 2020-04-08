import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  UPDATE_FUNDS: 'UPDATE_FUNDS',
  ...createRequestActionTypes('PORTFOLIO', {
    CREATE: 'CREATE',
    GET: 'GET',
    UPDATE: 'UPDATE',
    RESET: 'RESET',
  }),
};

export const updateFunds = payload => action(actionTypes.UPDATE_FUNDS, {payload});

export const createPortfolio = {
  request: (data, onSuccess) => action(actionTypes.CREATE[REQUEST], {data, onSuccess}),
  success: payload => action(actionTypes.CREATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CREATE[FAILURE]),
};

export const getPortfolio = {
  request: data => action(actionTypes.GET[REQUEST], {data}),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const updatePortfolio = {
  request: (data, portfolio_id, onSuccess) => action(actionTypes.UPDATE[REQUEST], {data, portfolio_id, onSuccess}),
  success: payload => action(actionTypes.UPDATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE[FAILURE]),
};

export const resetPortfolio = {
  request: (portfolioId, onSuccess) => action(actionTypes.RESET[REQUEST], {portfolioId, onSuccess}),
  success: payload => action(actionTypes.RESET[SUCCESS], {payload}),
  failure: () => action(actionTypes.RESET[FAILURE]),
};
