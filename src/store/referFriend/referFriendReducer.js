import {actionTypes} from './referFriendActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  SET_INFO,
} = actionTypes;

const initialState = {
  referFriendStatus: Api.initialStatus,
  referFriendMsg: '',
  errors: null,
};

export default function referFriend(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_INFO[REQUEST]:
      return {
        ...state,
        referFriendStatus: Api.requestStatus,
      };
    case SET_INFO[SUCCESS]:
      return {
        ...state,
        referFriendMsg: payload.msg && payload.msg.text,
        referFriendStatus: Api.successStatus,
      };
    case SET_INFO[FAILURE]:
      return {
        ...state,
        errors: payload.response.errors,
        referFriendStatus: Api.failStatus,
      };
    default:
      return state;
  }
}

