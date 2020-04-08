import {actionTypes} from './settingsActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_INFO,
} = actionTypes;

const initialState = {
  settingsData: null,
  settingsStatus: Api.initialStatus,
};

export default function settings(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_INFO[REQUEST]:
      return {
        ...state,
        settingsStatus: Api.requestStatus,
      };
    //case UPDATE_DEEP[SUCCESS]:
    case GET_INFO[SUCCESS]:
      return {
        ...state,
        settingsData: payload,
        settingsStatus: Api.successStatus,
      };
    case GET_INFO[FAILURE]:
      return {
        ...state,
        settingsStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

