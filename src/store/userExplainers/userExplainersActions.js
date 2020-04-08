import action from '../../utils/action';

export const actionTypes = {
  USER_HAS_SEEN: 'USER_HAS_SEEN',
};

export const userHasSeen = payload => action(actionTypes.USER_HAS_SEEN, {payload});
