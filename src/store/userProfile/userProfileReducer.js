import {actionTypes} from './userProfileActions';
import {actionTypes as authActionTypes} from '../auth/authActions';
import {actionTypes as quizActionTypes} from '../quiz/quizActions';
import {actionTypes as portfolioActionTypes} from '../portfolio/portfolioActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  EDIT,
  UPLOAD_AVATAR,
} = actionTypes;

const initialState = {
  data: null,
  dataStatus: Api.initialStatus,
};

export default function userProfile(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case EDIT[REQUEST]:
    case GET[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case EDIT[SUCCESS]:
    case UPLOAD_AVATAR[SUCCESS]:
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    case GET[SUCCESS]: {
      if (!payload.wv_is_complete) {
        localStorage.removeItem('fundsData');
      }
      return {
        ...state,
        data: payload,
        dataStatus: Api.successStatus,
      };
    }
    case EDIT[FAILURE]:
    case GET[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };

    case authActionTypes.LOGOUT:
      return {
        ...state,
        ...initialState,
      };

    case quizActionTypes.GET_DEEP[SUCCESS]:
    case quizActionTypes.GET_EXPRESS[SUCCESS]:
    case quizActionTypes.GET_EXPERT[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          current_quiz: payload.current_quiz,
        },
      };
    case quizActionTypes.UPDATE_DEEP[SUCCESS]:
    case quizActionTypes.UPDATE_EXPRESS[SUCCESS]:
    case quizActionTypes.UPDATE_EXPERT[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          current_quiz: payload.current_quiz,
          quiz_is_complete: payload.quiz_is_complete,
        },
      };
    case portfolioActionTypes.GET[SUCCESS]:
      return {
        ...state,
        data: {
          ...state.data,
          current_portfolio: payload.current_portfolio,
        },
      };
    default:
      return state;
  }
}
