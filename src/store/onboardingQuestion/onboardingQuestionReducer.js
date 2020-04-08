import {actionTypes} from './onboardingQuestionActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_QUESTIONS,
} = actionTypes;

const initialState = {
  questionsData: null,
  questionsDataStatus: Api.initialStatus,
};

export default function onboardingQuestion(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_QUESTIONS[REQUEST]:
      return {
        ...state,
        questionsDataStatus: Api.requestStatus,
      };
    case GET_QUESTIONS[SUCCESS]:
      return {
        ...state,
        questionsData: payload.data,
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

