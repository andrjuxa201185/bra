import {DOMAIN_URI, API_URI} from './apiConstants';

const credentials = {
  client: {
    id: 'rxTktX141BmgskA90a1QW096Rvq4tpCOTQ6YZhEs',
    secret: 'aVsdc4bbND6OlMq55isXIoGrzYzGoX1VgxSZe2W3FssIAGXeYuT97AfLj9TTDoWknqNdhz7LjDSLFJ2lv5RFKSjsT0c9X6QkhDTu2WmaOsFoEYcKyKJAYcdhQpFHFW1r',
  },
  auth: {
    tokenHost: DOMAIN_URI,
    tokenPath: `${API_URI}auth/token/`,
    revokePath: `${API_URI}auth/revoke_token/`,
  },
};
const oauth2 = require('simple-oauth2').create(credentials);

export default class Auth {
  static getToken(data) {
    const result = oauth2.ownerPassword.getToken(data);
    return result.then(data => {
      return data;
    }).catch(e => {
      console.warn('Error ', e); //eslint-disable-line
    });
  }

  static createAccessToken() {
    return oauth2.accessToken.create(Auth.getTokenFromLocalStorage());
  }

  static getTokenFromLocalStorage() {
    try {
      return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')): null;
    } catch(err) {
      return null;
    }

  }

  static revokeAll() {
    return Auth.createAccessToken().revokeAll();
  }

  static checkOnIsAdmin() {
    return localStorage.getItem('is_admin') ? localStorage.getItem('is_admin') : false;
  }
}
