import {actionTypes} from './userExplainersActions';

const {USER_HAS_SEEN} = actionTypes;

const initialState = {
  deepDiveSeen: !!localStorage.getItem('deepDiveSeen'),
};

export default function userExplainers(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case USER_HAS_SEEN:
      localStorage.setItem(payload, true);
      return {
        ...state,
        [payload]: true,
      };
    default:
      return state;
  }
}
