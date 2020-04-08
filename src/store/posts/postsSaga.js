import { call, put, take } from 'redux-saga/effects';
import { actionTypes } from './postsActions';
import * as actions from './postsActions';
import Api from "../../service/api";

const {GET_DATA, CREATE_POST, GET_POST_COMMENTS, CREATE_POST_COMMENT} = actionTypes;

function* getPostsSaga() {
  while (true) {
    const { payload = {} } = yield take(GET_DATA.REQUEST);
    const { categoryId, sortQuery, link } = payload;
    try {
      const params = [];
      categoryId && params.push(`category_id=${categoryId}`);
      sortQuery && params.push(`sort=${sortQuery}`);

      const response = yield call(Api.get, link || `discussion/posts${params.length ? '?' + params.join('&') : ''}`);

      if (response.status) {
        yield put(actions.getPostsData.success({ response, loadMore: !!link }));

      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* createPostSaga() {
  while (true) {
    const { payload = {}, onSuccess } = yield take(CREATE_POST.REQUEST);
    const {categoryId, nameTopic, text, libraryId} = payload;
    try {
      const response = yield call(Api.post, 'discussion/posts', { category_id: categoryId, library_id: libraryId || null, name: nameTopic, text }, null, false);

      if (response.status) {
        // yield put(actions.createPost.success({ response }));
        onSuccess(response.result.id);
      }
    } catch (e) {
      yield put(actions.createPost.failure({e: e.response.data}));
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* getCommentsSaga() {
  while (true) {
    const { payload = {} } = yield take(GET_POST_COMMENTS.REQUEST);
    const { discussionId, link, parentId } = payload;
    try {
      const responseComments = yield call(Api.get, link || `discussion/comments?discussion_id=${discussionId}${parentId ? `&parent_id=${parentId}` : ''}`);

      if (responseComments.status) {
        yield put(actions.getPostComments.success({ responseComments, loadMore: !!link, parentId }));
      }
    } catch (e) {
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

function* createCommentSaga() {
  while (true) {
    const { payload = {} } = yield take(CREATE_POST_COMMENT.REQUEST);
    const { discussionId, parentId, text } = payload;
    try {
      const response = yield call(Api.post, 'discussion/comments', { discussion_id: discussionId, parent_id: parentId, text}, null, false);

      if (response.status) {
        yield put(actions.createPostComment.success({ response, parentId }));
      }
    } catch (e) {
      yield put(actions.createPostComment.failure({e: e.response.data}));
      console.warn('error -> ', e);//eslint-disable-line
    }
  }
}

export default [
  getPostsSaga,
  getCommentsSaga,
  createCommentSaga,
  createPostSaga,
];
