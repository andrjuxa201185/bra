import {actionTypes} from './folioActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  SET_FOLIO_SIGNATURE,
  CHECK_FOLIO_STATUS,
  CLEAN_FOLIO_STATUS,
  GET_BANK_ACCOUNT,
} = actionTypes;

const initialState = {
  folioSignatureData: null,
  folioSignatureStatus: Api.initialStatus,
  checkData: null,
  checkDataStatus: Api.initialStatus,
  bankAccount: null,
  bankAccountStatus: Api.initialStatus,
};

export default function folio(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_FOLIO_SIGNATURE[REQUEST]:
      return {
        ...state,
        folioSignatureStatus: Api.requestStatus,
      };
    //case UPDATE_DEEP[SUCCESS]:
    case SET_FOLIO_SIGNATURE[SUCCESS]:
      return {
        ...state,
        folioSignatureData: payload,
        folioSignatureStatus: Api.successStatus,
      };
    case SET_FOLIO_SIGNATURE[FAILURE]:
      return {
        ...state,
        folioSignatureStatus: Api.failStatus,
      };
    case CHECK_FOLIO_STATUS[REQUEST]:
      return {
        ...state,
        checkDataStatus: Api.requestStatus,
      };
    case CHECK_FOLIO_STATUS[SUCCESS]:
      return {
        ...state,
        checkData: payload,
        checkDataStatus: Api.successStatus,
      };
    case CHECK_FOLIO_STATUS[FAILURE]:
      return {
        ...state,
        checkDataStatus: Api.failStatus,
      };
    case CLEAN_FOLIO_STATUS[REQUEST]:
    return {
      ...state,
      checkDataStatus: Api.initialStatus,
      checkData: null,
    };
    case GET_BANK_ACCOUNT[REQUEST]:
      return {
        ...state,
        bankAccountStatus: Api.requestStatus,
      };
    case GET_BANK_ACCOUNT[SUCCESS]:
      return {
        ...state,
        bankAccount: payload,
        bankAccountStatus: Api.successStatus,
      };
    case GET_BANK_ACCOUNT[FAILURE]:
      return {
        ...state,
        bankAccountStatus: Api.failStatus,
      };

    default:
      return state;
  }
}

