import 'whatwg-fetch';

class Fetch {
  constructor() {
    this.backend = '/';
  }
}

export class LocalAssets {
  config() {
    return new Promise(async (resolve, reject) => {
      const response = await fetch('config.json');
      resolve(response.json());
    });
  }
}

export class AuthController {
  constructor(fetch) {
    this.fetch = fetch;
  }

  login(username, password) {
  }

  logout() {
  }

  user() {

  }
}

export class PangulApiService {
  constructor() {
    this.fetch = new Fetch();
    this.config = null;
    this.assets = new LocalAssets();
    this.auth = new AuthController(this.fetch);
  }

  configure(config) {
    this.config = config;
    this.fetch.backend = config.backend;
  }
}
