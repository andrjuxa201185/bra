import {actionTypes} from './interestsActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET_DATA,
  UPDATE_DATA,
  UPDATE_WEIGHT,
} = actionTypes;

const initialState = {
  interestsData: null,
  interestsDataStatus: Api.initialStatus,
  responseId: null,
  interestsFundsWeight: 0,
  isShow: null,
};

export default function interests(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DATA[REQUEST]:
      return {
        ...state,
        interestsDataStatus: Api.requestStatus,
      };
    case GET_DATA[SUCCESS]:
      return {
        ...state,
        interestsData: payload.data,
        interestsDataStatus: Api.successStatus,
        responseId: payload.response_id,
        interestsFundsWeight: payload.weight,
        isShow: payload.is_show,
      };

    case GET_DATA[FAILURE]:
      return {
        ...state,
        interestsDataStatus: Api.failStatus,
      };

    case UPDATE_DATA[REQUEST]:
      return {
        ...state,
        interestsUpdateStatus: Api.requestStatus,
      };
    case UPDATE_DATA[SUCCESS]: {
      const [ tabId ] = Object.keys(payload.data);
      const { funds } = state.interestsData[tabId];
      const updatedFunds = { ...funds, ...payload.data[tabId] };

      return {
        ...state,
        interestsData: {
          ...state.interestsData,
          [tabId]: {
            ...state.interestsData[tabId],
            funds: updatedFunds,
          },
        },
        interestsFundsWeight: payload.weight,
        interestsUpdateStatus: Api.successStatus,
        responseId: payload.response_id,
      };
    }
    case UPDATE_DATA[FAILURE]:
      return {
        ...state,
        interestsUpdateStatus: Api.failStatus,
      };
    case UPDATE_WEIGHT[REQUEST]:
      return {
        ...state,
        updateWeightStatus: Api.requestStatus,
      };
    case UPDATE_WEIGHT[SUCCESS]:
      return {
        ...state,
        interestsFundsWeight: payload.weight,
        updateWeightStatus: Api.successStatus,
      };
    case UPDATE_WEIGHT[FAILURE]:
      return {
        ...state,
        updateWeightStatus: Api.failStatus,
      };

    default:
      return state;
  }
}

