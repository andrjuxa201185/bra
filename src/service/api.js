import axios from 'axios';
import { globals } from '../store/globals';
import Auth from './auth';
import * as authActions from '../store/auth/authActions';
import { showAlert } from '../store/alert/alertActions';
import {splitStringMainLetter} from '../utils';
import { DOMAIN_URI, API_URI } from './apiConstants';
// Local

export default class Api {
  static methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };

  static actionsStack = [];

  static get initialStatus() {
    return {
      loading: false,
      loaded: false,
      fail: false,
    };
  }

  static get requestStatus() {
    return {
      loading: true,
      loaded: false,
      fail: false,
    };
  }

  static get successStatus() {
    return {
      loading: false,
      loaded: true,
      fail: false,
    };
  }

  static get failStatus() {
    return {
      loading: false,
      loaded: false,
      fail: true,
    };
  }

  static getStaticUrl(url) {
    if (!url) {
      return null;
    }
    if (typeof url === 'string' && url.startsWith('http')) {
      return url;
    }
    return `${DOMAIN_URI}${API_URI}${url}`;
  }

  static composeRouteUrl(route) {
    if (route.startsWith('http')) {
      return route;
    }
    return `${DOMAIN_URI}${API_URI}${route}`;
  }

  static get(route, params) {
    return Api.request(route, params, undefined, Api.methods.GET);
  }

  static put(route, params, data) {
    return Api.request(route, params, data, Api.methods.PUT);
  }

  static patch(route, params, data) {
    return Api.request(route, params, data, Api.methods.PATCH);
  }

  static post(route, data, appendHeaders, handleFormError = true) {
    // console.log(handleFormError);
    return Api.request(route, undefined, data, Api.methods.POST, appendHeaders, handleFormError);
  }

  static delete(route, params) {
    return Api.request(route, params, undefined, Api.methods.DELETE);
  }

  static alert(msg) {
    if (typeof msg === 'string') {
      globals.store.dispatch(showAlert({
        title: 'Notification',
        msg: msg,
      }));
    } else if (typeof msg === 'object' && msg.title && msg.text ) {
      globals.store.dispatch(showAlert({
        title: msg.title,
        msg: msg.text,
      }));
    }
  }

  static uploadImage(url, method, image) {
    const form = new FormData();
    form.append('image', image, 'here_can_be_static_name.jpg');
    let headers = {
      'Content-Type': 'multipart/form-data',
    };
    const token = Auth.getTokenFromLocalStorage();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token.access_token;
    }
    return axios({
      method,
      url: Api.composeRouteUrl(url),
      headers,
      data: form,
    }).then(resp => {
      return resp.data;
    }).catch(err => {
      Api.handleError(err);
      throw err;
    });
  }

  static request(route, params, data, method, appendHeaders, handleFormError) {
    const url = Api.composeRouteUrl(route, params);
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };
    const token = Auth.getTokenFromLocalStorage();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token.access_token;
    }

    if (appendHeaders) {
      headers = {...headers, ...appendHeaders};
    }

    return axios({
      method,
      url,
      headers,
      params,
      data,
    })
      .then(resp => {
        if (resp.data.msg) {
          Api.alert(resp.data.msg);
        }
        // if (!resp.data.status) {
        //   Api.handleError(resp);
        //   console.log('asdasdasd@@@@@@@@@@@@@', );
        //
        //   throw new Error(resp.data.message || 'Unknown Error');
        // }
        return resp.data;
      })
      .catch(err => {
        Api.handleError(err, handleFormError, url);
        throw err;
      });
  }

  static handleError(error, handleFormError, url) {
    const response = error.response || error;
    let message = response.data && response.data.msg;

    let details = '';
    const accessToken = Auth.getTokenFromLocalStorage() ? Auth.createAccessToken() : null;

    if (response.status === 401 && !globals.store.getState().auth.tokenLoading) { // if token is expired
      globals.store.dispatch(authActions.refreshToken.request()); // refresh token request
      accessToken.refresh().then(({token}) => { // refresh token success
        globals.store.dispatch(authActions.refreshToken.success({...token}));

        if (Api.actionsStack.length) {
          Api.actionsStack.forEach(item => { // dispatch last ten actions which had failure after token expired
            globals.store.dispatch(item);
          });
        }

      }).catch(() => { // if refresh token is expired - logout
        globals.store.dispatch(authActions.logout());
      });
      return;
    }

    if (handleFormError) {
      if (response.data && response.data.errors && Object.keys(response.data.errors).length ) {
        for (let name in response.data.errors) {
          details += `${splitStringMainLetter(name+'', '_')}: ${response.data.errors[name]}\n`;

        }
      }
      if (message) {
        if (url !== `${DOMAIN_URI}${API_URI}additional/referral/`) {
          Api.alert({
            title: 'Error',
            text: details || typeof message === 'object' ? message.text : message,
          });
        }
      }
    }

    // console.log(`Error occurred\\n${response.status} ${response.data.code}`); //eslint-disable-line
    // else if (response.data && response.data.code) {
    //   console.log(`Error occurred\\n${response.status} ${response.data.code}`);
    //
    //   // globals.store.dispatch(showAlert({
    //   //   title: 'Error',
    //   //   msg: `Error occurred\n${response.status} ${response.data.code}`,
    //   // }));
    // } else {
    //   console.log(`Error occurred\n${response.status ? response.status : ''} Unknown server error`);
    //
    //   // globals.store.dispatch(showAlert({
    //   //   title: 'Error',
    //   //   msg: `Error occurred\n${response.status ? response.status : ''} Unknown server error`,
    //   // }));
    // }
    // if (response.status === 401) {
    //   globals.store.dispatch(authActions.logout());
    // }
  }
}
