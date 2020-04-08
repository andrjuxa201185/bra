import {actionTypes} from './authActions';
import {SUCCESS, REQUEST, FAILURE} from '../../utils/action';
import Auth from '../../service/auth';
//import {FORCE_LOGIN} from "../../navigation/routes";

const {
  LOGIN,
  REFRESH_TOKEN,
  LOGOUT,
  GUEST_LOGIN,
  FORCE_LOGIN,
  REGISTRATION,
  VERIFICATION,
  RESEND_CONFIRMATION_EMAIL,
} = actionTypes;

const initialState = {
  tokenLoading: false,
  token: Auth.getTokenFromLocalStorage(),
  is_admin: Auth.checkOnIsAdmin(),
};

export default function auth(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case REFRESH_TOKEN[REQUEST]:
      return {
        ...state,
        tokenLoading: true,
      };
    case REFRESH_TOKEN[SUCCESS]:
      localStorage.setItem('token', JSON.stringify(payload));
      return {
        ...state,
        token: payload,
        tokenLoading: false,
      };
    case GUEST_LOGIN[SUCCESS]:
    case REGISTRATION[SUCCESS]:
      localStorage.setItem('email', payload.email);
      return state;
    case LOGIN[SUCCESS]:
    case VERIFICATION[SUCCESS]:
      localStorage.setItem('token', JSON.stringify(payload));
      return {
        ...state,
        token: payload,
        tokenLoading: false,
      };
    case FORCE_LOGIN[SUCCESS]:
      localStorage.setItem('token', JSON.stringify(payload));
      localStorage.setItem('is_admin', true);
      return {
        ...state,
        token: payload,
        tokenLoading: false,
        is_admin: true,
      };
    case LOGOUT: {
      Auth.revokeAll();
      localStorage.removeItem('token');
      localStorage.removeItem('fundsData');
      Auth.checkOnIsAdmin() && localStorage.removeItem('is_admin');
      localStorage.removeItem('email');
      return {
        ...state,
        token: null,
        is_admin: false,
      };
    }
    case REFRESH_TOKEN[FAILURE]:
      return {
        tokenLoading: false,
      };

    default:
      return state;
  }
}

