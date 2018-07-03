import {AuthService} from '../../common/services/authService';

export class PangulAuthService extends AuthService {
  constructor(api) {
    super(api);
    this.api = api;
  }

  login(username, password) {
    return this.api.auth.login(username,  password);
  }

  /** Return a promise for logout */
  logout(context) {
    return Promise.reject(new Error('Not implemented'));
  }
}