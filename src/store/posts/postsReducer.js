import {actionTypes} from './postsActions';
import { REQUEST, SUCCESS, FAILURE } from '../../utils/action';
import Api from "../../service/api";

const { GET_DATA, GET_POST_COMMENTS, CREATE_POST_COMMENT, CREATE_POST } = actionTypes;
const getUniqueComments = comments => {
  return comments.filter((comment, pos) => {
    return comments.findIndex(item => item.id === comment.id) === pos;
  });
};

const initialState = {
  postsData: [],
  myDiscussions: [],
  hotDiscussions: [],
  nextPostsLink: null,
  postsDataStatus: Api.initialStatus,
  error: {},
  post: {
    comments: [],
    mainTopic: null,
    nextCommentsLink: null,
    errorComment: {},
    status: Api.initialStatus,
  },
};

export default function posts(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DATA[REQUEST]:
      return {
        ...state,
        postsDataStatus: Api.requestStatus,
      };
    case GET_DATA[SUCCESS]: {
      const { response, loadMore } = payload;
      const data = loadMore ? [...state.postsData, ...response.result] : response.result;
      return {
        ...state,
        postsData: data,
        myDiscussions: response.my_discussions,
        hotDiscussions: response.hot_discussions,
        nextPostsLink: response.next,
        postsDataStatus: Api.successStatus,
      };
    }
    case GET_DATA[FAILURE]:
      return {
        ...state,
        postsDataStatus: Api.failStatus,
      };
    case CREATE_POST[FAILURE]:
      return {
        ...state,
        error: payload.e,
        createPostStatus: Api.failStatus,
      };
    case GET_POST_COMMENTS[REQUEST]:
      return {
        ...state,
        post: {
          ...state.post,
          status: Api.requestStatus,
        },
      };
    case GET_POST_COMMENTS[SUCCESS]: {
      const { responseComments, parentId, loadMore } = payload;
      if (parentId) {
        const commentsData = state.post.comments.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              sub_comments: getUniqueComments([...item.sub_comments, ...responseComments.result]),
              comments_count: responseComments.count,
              sub_comments_pagination: {
                next: responseComments.next,
              },
            };
          }
          return item;
        });

        return {
          ...state,
          post: {
            ...state.post,
            comments: commentsData,
          },
        };
      }

      const { main_topic: mainTopic, result: newComments, next: nextCommentsLink } = responseComments;
      let commentsData = loadMore ? getUniqueComments([...state.post.comments, ...newComments]) : newComments;

      return {
        ...state,
        post: {
          ...state.post,
          comments: commentsData,
          mainTopic,
          nextCommentsLink,
          status: Api.successStatus,
        },
      };
    }
    case GET_POST_COMMENTS[FAILURE]:
      return {
        ...state,
        post: {
          ...state.post,
          status: Api.failStatus,
        },
      };
    case CREATE_POST_COMMENT[SUCCESS]: {
      const { payload: { response: { result: comment }, parentId } } = action;
      let comments;
      if (parentId) {
        comments = state.post.comments.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              sub_comments: [
                comment,
                ...item.sub_comments,
              ],
            };
          }

          return item;
        });
      } else {
        comments = [comment, ...state.post.comments];
      }

      return {
        ...state,
        post: {
          ...state.post,
          comments,
          mainTopic: {
            ...state.post.mainTopic,
            comments_count: state.post.mainTopic.comments_count + 1,
          },
          commentError: {},
        },
      };
    }
    case CREATE_POST_COMMENT[FAILURE]:
      return {
        ...state,
        post: {
          ...state.post,
          errorComment: payload.e,
          status: Api.failStatus,
        },
      };
    default:
      return state;
  }
}
