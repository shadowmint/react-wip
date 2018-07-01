import { Subject } from 'rxjs';

export class UserContext {
  constructor(authService, logger) {
    this.authService = authService;
    this.logger = logger;
    this.user = null;
    this.userStore = new Subject();
  }
}
