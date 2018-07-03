import { BackendFetch } from './internal/backendFetch';
import {LocalAssets} from './apis/staticAssets';
import {AuthController} from './apis/authController';

export class PangulApiService {
  constructor(logger) {
    this.fetch = new BackendFetch();
    this.config = null;
    this.assets = new LocalAssets();
    this.auth = new AuthController(this.fetch, logger);
  }

  configure(config) {
    this.config = config;
    this.fetch.backend = config.backend;
  }
}
