import {actionTypes} from './quizActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET_DEEP,
  UPDATE_DEEP,
  GET_EXPRESS,
  UPDATE_EXPRESS,
  GET_EXPERT,
  UPDATE_EXPERT,
} = actionTypes;

const initialState = {
  deepDiveData: [],
  deepDiveDataStatus: Api.initialStatus,
  deepDiveProgress: 0,
  //
  expressData: [],
  expressDataStatus: Api.initialStatus,
  expressProgress: 0,
  //
  expertData: [],
  expertDataStatus: Api.initialStatus,
  expertProgress: 0,
  responseId: null,
  isComplete: null,
};

export default function quiz(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DEEP[REQUEST]:
      return {
        ...state,
        deepDiveDataStatus: Api.requestStatus,
      };
    case UPDATE_DEEP[SUCCESS]:
    case GET_DEEP[SUCCESS]:
      return {
        ...state,
        deepDiveData: [...payload.data],
        deepDiveDataStatus: Api.successStatus,
        deepDiveProgress: payload.user_progress,
        responseId: payload.response_id,
        isComplete: payload.thank_page,
      };
    case GET_DEEP[FAILURE]:
      return {
        ...state,
        deepDiveDataStatus: Api.failStatus,
      };
    case GET_EXPRESS[REQUEST]:
      return {
        ...state,
        expressDataStatus: Api.requestStatus,
      };
    case UPDATE_EXPRESS[SUCCESS]:
    case GET_EXPRESS[SUCCESS]:
      return {
        ...state,
        expressData: [...payload.data],
        expressDataStatus: Api.successStatus,
        expressProgress: payload.user_progress,
        responseId: payload.response_id,
        isComplete: payload.thank_page,
      };
    case GET_EXPRESS[FAILURE]:
      return {
        ...state,
        expressDataStatus: Api.failStatus,
      };
    case GET_EXPERT[REQUEST]:////
      return {
        ...state,
        expertDataStatus: Api.requestStatus,
      };
    case UPDATE_EXPERT[SUCCESS]:
    case GET_EXPERT[SUCCESS]:
      return {
        ...state,
        expertData: [...payload.data],
        expertDataStatus: Api.successStatus,
        expertProgress: payload.user_progress,
        responseId: payload.response_id,
        isComplete: payload.thank_page,
      };
    case GET_EXPERT[FAILURE]:
      return {
        ...state,
        expertDataStatus: Api.failStatus,
      };

    default:
      return state;
  }
}

