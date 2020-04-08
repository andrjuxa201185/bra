import {actionTypes} from './traiderStatusActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
} = actionTypes;

const initialState = {
  traiderStatusData: null,
  traiderStatusDataStatus: Api.initialStatus,
};

export default function traiderStatus(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
      return {
        ...state,
        traiderStatusDataStatus: Api.requestStatus,
      };
    case GET[SUCCESS]:
      return {
        ...state,
        traiderStatusData: payload,
        traiderStatusDataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
      return {
        ...state,
        traiderStatusDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

