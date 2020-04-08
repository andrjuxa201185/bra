import {actionTypes} from './categoriesActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {GET_DATA} = actionTypes;

const initialState = {
  categoriesData: [],
  categoriesDataStatus: Api.initialStatus,
};

export default function categories(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DATA[REQUEST]:
      return {
        ...state,
        categoriesDataStatus: Api.requestStatus,
      };
    case GET_DATA[SUCCESS]:
      return {
        ...state,
        categoriesData:[
          // {
          //   id: 0,
          //   name: 'All',
          // },
          ...payload,
        ],
        categoriesDataStatus: Api.successStatus,
      };
    case GET_DATA[FAILURE]:
      return {
        ...state,
        categoriesDataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

