import {actionTypes} from './lifestyleActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET_QUESTIONS,
  SET_ANSWERS,
} = actionTypes;

const initialState = {
  questionsData: null,
  questionsDataStatus: Api.initialStatus,
};

export default function lifestyle(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_QUESTIONS[REQUEST]:
      return {
        ...state,
        questionsDataStatus: Api.requestStatus,
      };
    case SET_ANSWERS[SUCCESS]:
    case GET_QUESTIONS[SUCCESS]:
      return {
        ...state,
        questionsData: payload,
        questionsDataStatus: Api.successStatus,
      };
    case GET_QUESTIONS[FAILURE]:
      return {
        ...state,
        questionsDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

