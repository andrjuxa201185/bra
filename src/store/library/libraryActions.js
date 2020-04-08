import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('LIBRARY', {
    GET_DATA: 'GET_DATA',
    GET_ARTICLE: 'GET_ARTICLE',
  }),
};

export const getLibraryData = {
  request: payload => action(actionTypes.GET_DATA[REQUEST], {payload}),
  success: payload => action(actionTypes.GET_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DATA[FAILURE]),
};

export const getArticle = {
  request: articleId => action(actionTypes.GET_ARTICLE[REQUEST], {articleId}),
  success: payload => action(actionTypes.GET_ARTICLE[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ARTICLE[FAILURE]),
};
