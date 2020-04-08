import {actionTypes} from './onboardingPortfolioActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_PORTFOLIO,
  SET_PORTFOLIO,
} = actionTypes;

const initialState = {
  questionsData: null,
  questionsDataStatus: Api.initialStatus,
  setPortfolioDataStatus: Api.initialStatus,
};

export default function onboardingPortfolio(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_PORTFOLIO[REQUEST]:
      return {
        ...state,
        questionsDataStatus: Api.requestStatus,
      };
    case GET_PORTFOLIO[SUCCESS]:
      return {
        ...state,
        questionsData: payload.data,
        questionsDataStatus: Api.successStatus,
      };
    case GET_PORTFOLIO[FAILURE]:
      return {
        ...state,
        questionsDataStatus: Api.failStatus,
      };
    case SET_PORTFOLIO[SUCCESS]:
      return {
        ...state,
        setPortfolioDataStatus: Api.requestStatus,
      };
    default:
      return state;
  }
}

