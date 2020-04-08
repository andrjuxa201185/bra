import {actionTypes} from './libraryActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const {GET_DATA, GET_ARTICLE} = actionTypes;

const initialState = {
  libraryData: [],
  libraryDataStatus: Api.initialStatus,
  article: {
    articleData: [],
    articleDataStatus: Api.initialStatus,
  },
};

export default function library(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DATA[REQUEST]:
      return {
        ...state,
        libraryDataStatus: Api.requestStatus,
      };
    case GET_DATA[SUCCESS]: {
      const { response, loadMore } = payload;
      const data = loadMore ? [...state.libraryData, ...response.result] : response.result;
      return {
        ...state,
        libraryData: data,
        nextArticlesLink: response.next,
        libraryDataStatus: Api.successStatus,
      };
    }
    case GET_DATA[FAILURE]:
      return {
        ...state,
        libraryDataStatus: Api.failStatus,
      };

    case GET_ARTICLE[REQUEST]:
      return {
        ...state,
        article: {
          ...state.article,
          articleDataStatus: Api.requestStatus,
        },
      };
    case GET_ARTICLE[SUCCESS]:
      return {
        ...state,
        article: {
          articleData: [...payload],
          articleDataStatus: Api.successStatus,
        },
      };
    case GET_ARTICLE[FAILURE]:
      return {
        ...state,
        article: {
          ...state.article,
          articleDataStatus: Api.failStatus,
        },
      };
    default:
      return state;
  }
}
