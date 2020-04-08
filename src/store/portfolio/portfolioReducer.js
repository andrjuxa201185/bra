import {actionTypes} from './portfolioActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  //CREATE,
  GET,
  UPDATE_FUNDS,
  UPDATE,
  RESET,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
  is_pending: false,
  is_rebalance: false,
  tailoredLocally: localStorage.getItem('tailoredLocally') === '1',
  fundsData: JSON.parse(localStorage.getItem('fundsData')),
};

export default function portfolio(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_FUNDS: {
      const {newFundsData} = payload;
      localStorage.setItem('fundsData', JSON.stringify(newFundsData));
      if (!state.data.is_tailored) {
        localStorage.setItem('tailoredLocally', '1');
        return {
          ...state,
          fundsData: newFundsData,
          tailoredLocally: true,
        };
      }
      return {
        ...state,
        fundsData: newFundsData,
      };
      // return {
      //   ...state,
      //   fundsData: newFundsData,
      //   data: {
      //     ...state.data,
      //     brains_funds: newFundsData,
      //   },
      // };
    }
    case UPDATE[REQUEST]:
    case RESET[REQUEST]:
    case GET[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case UPDATE[SUCCESS]:
    case RESET[SUCCESS]: {
      localStorage.setItem('fundsData', JSON.stringify(payload.brains_funds));
      localStorage.setItem('tailoredLocally', '0');

      return {
        ...state,
        data: payload,
        fundsData: payload.brains_funds,
        dataStatus: Api.successStatus,
        tailoredLocally: false,
      };
    }

    case GET[SUCCESS]: {
      if (!payload.brains_funds) {
        return {
          ...state,
          data: null,
          is_pending: payload.is_pending,
          is_rebalance: payload.is_rebalance,
          dataStatus: Api.successStatus,
        };
      }

      if (!state.fundsData || (!payload.is_tailored && !state.tailoredLocally)) {
        localStorage.setItem('fundsData', JSON.stringify(payload.brains_funds));
        return {
          ...state,
          data: payload,
          fundsData: payload.brains_funds,
          is_pending: payload.is_pending,
          is_rebalance: payload.is_rebalance,
          dataStatus: Api.successStatus,
        };
      }
      // localStorage.setItem('tailoredLocally', '0');
      return {
        ...state,
        data: payload,
        is_pending: payload.is_pending,
        is_rebalance: payload.is_rebalance,
        // tailoredLocally: false,
        dataStatus: Api.successStatus,
      };
    }
    case UPDATE[FAILURE]:
    case RESET[FAILURE]:
    case GET[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };

    default:
      return state;
  }
}

