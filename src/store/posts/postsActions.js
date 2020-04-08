import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('POSTS', {
    GET_DATA: 'GET_DATA',
    CREATE_POST: 'CREATE_POST',
    GET_POST_COMMENTS: 'GET_POST_COMMENTS',
    CREATE_POST_COMMENT: 'CREATE_POST_COMMENT',
}),
};

export const getPostsData = {
  request: payload => action(actionTypes.GET_DATA[REQUEST], {payload}),
  success: payload => action(actionTypes.GET_DATA[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_DATA[FAILURE]),
};

export const createPost = {
  request: (payload, onSuccess) => action(actionTypes.CREATE_POST[REQUEST], {payload, onSuccess}),
  success: payload => action(actionTypes.CREATE_POST[SUCCESS], {payload}),
  failure: payload => action(actionTypes.CREATE_POST[FAILURE], {payload}),
};

export const getPostComments = {
  request: payload => action(actionTypes.GET_POST_COMMENTS[REQUEST], {payload}),
  success: payload => action(actionTypes.GET_POST_COMMENTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_POST_COMMENTS[FAILURE]),
};

export const createPostComment = {
  request: payload => action(actionTypes.CREATE_POST_COMMENT[REQUEST], {payload}),
  success: payload => action(actionTypes.CREATE_POST_COMMENT[SUCCESS], {payload}),
  failure: payload => action(actionTypes.CREATE_POST_COMMENT[FAILURE], {payload}),
};

