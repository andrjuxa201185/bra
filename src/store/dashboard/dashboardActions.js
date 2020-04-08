import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('DASHBOARD', {
    GET_ASSESSMENTS: 'GET_ASSESSMENTS',
    GET_OUTLOOK: 'GET_OUTLOOK',
    GET_ACTIVITIES: 'GET_ACTIVITIES',
    RESET_ACTIVITY: 'RESET_ACTIVITY',
  }),
};

export const getAssessments = {
  request: () => action(actionTypes.GET_ASSESSMENTS[REQUEST]),
  success: payload => action(actionTypes.GET_ASSESSMENTS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ASSESSMENTS[FAILURE]),
};

export const getOutlook = {
  request: () => action(actionTypes.GET_OUTLOOK[REQUEST]),
  success: payload => action(actionTypes.GET_OUTLOOK[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_OUTLOOK[FAILURE]),
};

export const getActivities = {
  request: payload => action(actionTypes.GET_ACTIVITIES[REQUEST], {payload}),
  success: payload => action(actionTypes.GET_ACTIVITIES[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_ACTIVITIES[FAILURE]),
};

export const resetActivities = () => action(actionTypes.RESET_ACTIVITY[REQUEST]);
