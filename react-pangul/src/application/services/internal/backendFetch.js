import 'whatwg-fetch';

export class BackendFetch {
  constructor() {
    this.backend = '/';
  }

  post(url, data) {
    return fetch(`${this.backend}${url}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      headers: {
        'X-Requested-With': 'PANGUL',
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify(data),
    });
  }
}
