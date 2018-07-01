import React from 'react';
import Login from '../../../src/common/elments/auth/login';
import { User } from '../../../src/common/model/user';
import AuthGuard from '../../../src/common/elments/auth/authGuard';
import { Logger } from '../../../src/common/services/logger';
import { AuthService } from '../../../src/common/services/authService';
import RequiresPermission from '../../../src/common/elments/auth/requiresPermission';
import { UserContext } from '../../../src/common/contexts/userContext';
import NotAuthorized from '../../../src/common/elments/auth/notAuthorized';
import Logout from '../../../src/common/elments/auth/logout';
import RequiresLogin from '../../../src/common/elments/auth/requiresLogin';

class FakeAuth extends AuthService {
  login(username, password) {
    return new Promise((resolve, reject) => {
      console.log('Attempt', username, password);
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          resolve(new User('admin', ['user', 'permA']));
          return;
        }
        if (username === 'fake' && password === 'fake') {
          resolve(new User('admin', ['permB']));
          return;
        }
        reject(new Error('Login failed'));
      }, 2000);
    });
  }

  logout(context) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }
}

const mutableUser = new UserContext(new FakeAuth(), new Logger());

const authorizedUser = new UserContext(new FakeAuth(), new Logger());
authorizedUser.user = new User('admin', ['user']);

const unauthorizedUser = new UserContext(new FakeAuth(), new Logger());
unauthorizedUser.user = new User('admin', ['perm']);

const notLoggedInUser = new UserContext(new FakeAuth(), new Logger());

export class AuthDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    mutableUser.userStore.subscribe((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="example short">Not logged in? Try using admin/admin or fake/fake</div>
        <div className="example">
          <div className="box">
            <Login userContext={mutableUser} />
          </div>
          <div className="box">
            <RequiresLogin userContext={mutableUser}>
              <div>
                  Logged in: {(this.state.user || {}).name}
              </div>
            </RequiresLogin>
          </div>
        </div>

        <div className="example">
          <div className="box">
            <Logout userContext={mutableUser} />
          </div>
          <div className="box">
            <RequiresLogin userContext={mutableUser}>
              <div>
                Logged in: {(this.state.user || {}).name}
              </div>
            </RequiresLogin>
          </div>
        </div>

        <div className="example">
          <div className="box">
            Should be authorized:
            <RequiresPermission userContext={authorizedUser} permissions={['user']}>
              <div>
                Some authorized content goes here!
              </div>
            </RequiresPermission>
          </div>

          <div className="box">
            Not authorized:
            <RequiresPermission userContext={notLoggedInUser} permissions={['user']}>
              <div>
                Hidden content here is never rendered
              </div>
            </RequiresPermission>
          </div>

          <div className="box">
            Partial auth:
            <RequiresPermission userContext={unauthorizedUser} permissions={['perm']}>
              <div>
                Some authorized content goes here!
              </div>
              <NotAuthorized>
                <div>
                  Permission denied!
                </div>
              </NotAuthorized>
            </RequiresPermission>
            <RequiresPermission userContext={unauthorizedUser} permissions={['user']}>
              <div>
              Some authorized content goes here!
              </div>
              <NotAuthorized>
                <div>
                  Permission denied to other section.
                </div>
              </NotAuthorized>
            </RequiresPermission>
          </div>
        </div>

        <div className="example">
          <AuthGuard userContext={mutableUser}>
            <div>
              Logged in content! <Logout userContext={mutableUser} />
            </div>
            <div>
              But below is are sections with different permission requirements!
            </div>
            <div>
              <RequiresPermission userContext={mutableUser} permissions={['user']}>
                <div>
                  Some authorized content goes here!
                </div>
                <NotAuthorized>
                  No permission for this user!
                </NotAuthorized>
              </RequiresPermission>
            </div>
          </AuthGuard>
        </div>
      </React.Fragment>
    );
  }
}
