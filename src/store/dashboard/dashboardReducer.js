import {actionTypes} from './dashboardActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {
  GET_ASSESSMENTS, GET_OUTLOOK, GET_ACTIVITIES, RESET_ACTIVITY,
} = actionTypes;

const initialState = {
  assessmentsDataStatus: Api.initialStatus,
  outlookDataStatus: Api.initialStatus,
  snapshotData: null,
  activitiesData: null,
  activitiesDataStatus: Api.initialStatus,
};

export default function dashboard(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_ASSESSMENTS[REQUEST]:
      return {
        ...state,
        assessmentsDataStatus: Api.requestStatus,
      };
    case GET_ASSESSMENTS[SUCCESS]: {
      return {
        ...state,
        assessmentsDataStatus: Api.successStatus,
        snapshotData: {...state.snapshotData, ...payload},
      };
    }
    case GET_ASSESSMENTS[FAILURE]:
      return {
        ...state,
        assessmentsDataStatus: Api.failStatus,
      };
    case GET_OUTLOOK[REQUEST]:
      return {
        ...state,
        outlookDataStatus: Api.requestStatus,
      };
    case GET_OUTLOOK[SUCCESS]:
      return {
        ...state,
        outlookDataStatus: Api.successStatus,
        snapshotData: {
          ...state.snapshotData,
          outlook_meter_value: payload.outlook_meter_value,
        },
      };
    case GET_OUTLOOK[FAILURE]:
      return {
        ...state,
        outlookDataStatus: Api.failStatus,
      };
    case GET_ACTIVITIES[REQUEST]:
      return {
        ...state,
        activitiesDataStatus: Api.requestStatus,
      };
    case GET_ACTIVITIES[SUCCESS]:
      return {
        ...state,
        activitiesDataStatus: Api.successStatus,
        activitiesData: payload,
      };
    case GET_ACTIVITIES[FAILURE]:
      return {
        ...state,
        activitiesDataStatus: Api.failStatus,
      };
    case RESET_ACTIVITY[REQUEST]:
      return {
        ...state,
        activitiesDataStatus: Api.initialStatus,
        activitiesData: null,
      };
    default:
      return state;
  }
}

