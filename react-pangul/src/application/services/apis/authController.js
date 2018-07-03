import {User} from '../../../common/model/user';

export class AuthController {
  constructor(fetch, logger) {
    this.fetch = fetch;
    this.logger = logger;
  }

  async login(username, password) {
    try {
      const response = await this.fetch.post('/api/auth/login', { username: username, password: password });
      const loginRespones = response.json();
      debugger;
    }
    catch (error) {
      this.logger.error(error);
    }
    return null;
  }

  logout() {
  }

  async user() {
    try {
      const response = await this.fetch.post('/api/auth/claims');
      const userClaims = response.json();
      debugger;
      return new User('hello', userClaims);
    }
    catch (error) {
      this.logger.error(error);
    }
    return null;
  }
}