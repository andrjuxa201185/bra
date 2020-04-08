import {actionTypes} from './currentPortfolioActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
  is_pending: false,
  is_rebalance: false,
  total_amount: '',
  is_tailored: false,
  next_trading_window_at: '',
  // tailoredLocally: localStorage.getItem('tailoredLocally') === '1',
  // fundsData: JSON.parse(localStorage.getItem('fundsData')),
};

export default function currentPortfolio(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {

    case GET[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };

    case GET[SUCCESS]: {
      return {
        ...state,
        data: payload,
        is_pending: payload.is_pending,
        is_rebalance: payload.is_rebalance,
        total_amount: payload.total_amount,
        is_tailored: payload.is_tailored,
        next_trading_window_at: payload.next_trading_window_at,
        dataStatus: Api.successStatus,
      };
    }
    case GET[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };

    default:
      return state;
  }
}

