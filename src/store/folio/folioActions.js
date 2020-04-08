import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  ...createRequestActionTypes('FOLIO', {
    SET_FOLIO_SIGNATURE: 'SET_FOLIO_SIGNATURE',
    CHECK_FOLIO_STATUS: 'CHECK_FOLIO_STATUS',
    CLEAN_FOLIO_STATUS: 'CLEAN_FOLIO_STATUS',
    GET_BANK_ACCOUNT: 'GET_BANK_ACCOUNT',
  }),
};

export const setFolioSignature = {
  request: payload => action(actionTypes.SET_FOLIO_SIGNATURE[REQUEST], {payload}),
  success: payload => action(actionTypes.SET_FOLIO_SIGNATURE[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_FOLIO_SIGNATURE[FAILURE]),
};

export const checkFolioStatus = {
  request: () => action(actionTypes.CHECK_FOLIO_STATUS[REQUEST]),
  success: payload => action(actionTypes.CHECK_FOLIO_STATUS[SUCCESS], {payload}),
  failure: () => action(actionTypes.CHECK_FOLIO_STATUS[FAILURE]),
};

//CLEAN_FOLIO_STATUS

export const cleanFolioStatus = {
  request: () => action(actionTypes.CLEAN_FOLIO_STATUS[REQUEST]),
  // success: payload => action(actionTypes.CHECK_FOLIO_STATUS[SUCCESS], {payload}),
  // failure: () => action(actionTypes.CHECK_FOLIO_STATUS[FAILURE]),
};

export const getBankAccount = {
  request: () => action(actionTypes.GET_BANK_ACCOUNT[REQUEST]),
  success: payload => action(actionTypes.GET_BANK_ACCOUNT[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_BANK_ACCOUNT[FAILURE]),
};
