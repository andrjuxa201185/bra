import {actionTypes} from './onboardingActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET,
} = actionTypes;

const initialState = {
  onboardingData: null,
  onboardingDataStatus: Api.initialStatus,
};

export default function onboarding(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET[REQUEST]:
      return {
        ...state,
        onboardingDataStatus: Api.requestStatus,
      };
    case GET[SUCCESS]:
      return {
        ...state,
        onboardingData: payload,
        onboardingDataStatus: Api.successStatus,
      };
    case GET[FAILURE]:
      return {
        ...state,
        onboardingDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

