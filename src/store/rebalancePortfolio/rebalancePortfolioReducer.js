import {actionTypes} from './rebalancePortfolioActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
    SET,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
};

export default function rebalancePortfolio(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case SET[SUCCESS]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    case SET[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

