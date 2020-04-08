import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './libraryActions';
import * as actions from './libraryActions';
import Api from "../../service/api";

const {GET_DATA, GET_ARTICLE} = actionTypes;

function* getLibrarySaga() {
  while (true) {
    const { payload = {} } = yield take(GET_DATA.REQUEST);
    const { categoryId, sortQuery, link } = payload;
    try {
      const params = [];
      categoryId && params.push(`category_id=${categoryId}`);
      sortQuery && params.push(`sort=${sortQuery}`);

      const response = yield call(Api.get, link || `library/articles${params.length ? '?' + params.join('&') : ''}`);

      if (response.status) {
        yield put(actions.getLibraryData.success({ response, loadMore: !!link }));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getArticleSaga() {
  while (true) {
    const { articleId } = yield take(GET_ARTICLE.REQUEST);
    try {
      const params = [];
      articleId && params.push(`library_id=${articleId}`);

      const response = yield call(Api.get, `library/articles?library_id=${articleId}`);

      if (response.status) {
        yield put(actions.getArticle.success(response.result));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getLibrarySaga,
  getArticleSaga,
];
