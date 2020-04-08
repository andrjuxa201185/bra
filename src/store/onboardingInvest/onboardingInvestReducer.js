import {actionTypes} from './onboardingInvestActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
  SET,
} = actionTypes;

const initialState = {
  onboardingInvestData: null,
  onboardingInvestDataStatus: Api.initialStatus,
};

export default function onboardingInvest(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
      return {
        ...state,
        onboardingInvestDataStatus: Api.requestStatus,
      };
    case GET[SUCCESS]:
      return {
        ...state,
        onboardingInvestData: payload,
        onboardingInvestDataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
      return {
        ...state,
        onboardingInvestDataStatus: Api.failStatus,
      };
    case SET[REQUEST]:
      return {
        ...state,
        setInvestDataStatus: Api.requestStatus,
      };
    case SET[SUCCESS]:
      return {
        ...state,
        setInvestData: payload,
        setInvestDataStatus: Api.successStatus,
      };
    case SET[FAILURE]:
      return {
        ...state,
        setInvestDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

