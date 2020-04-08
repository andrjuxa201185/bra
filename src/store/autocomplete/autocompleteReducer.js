import {actionTypes} from './autocompleteActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {GET_DATA} = actionTypes;

const initialState = {
  autocompleteData: [],
  autocompleteDataStatus: Api.initialStatus,
};

export default function autocomplete(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DATA[REQUEST]:
      return {
        ...state,
        autocompleteDataStatus: Api.requestStatus,
      };
    case GET_DATA[SUCCESS]:
      return {
        ...state,
        autocompleteData: payload,
        autocompleteDataStatus: Api.successStatus,
      };
    case GET_DATA[FAILURE]:
      return {
        ...state,
        autocompleteDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}
