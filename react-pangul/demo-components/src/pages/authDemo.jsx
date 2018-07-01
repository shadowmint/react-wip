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
}

const mutableUser = new UserContext(new FakeAuth(), new Logger());

const authorizedUser = new UserContext(new FakeAuth(), new Logger());
authorizedUser.user = new User('admin', ['user']);

const unauthorizedUser = new UserContext(new FakeAuth(), new Logger());
unauthorizedUser.user = new User('admin', []);

const notLoggedInUser = new UserContext(new FakeAuth(), new Logger());

export const AuthDemo = () => (
  <React.Fragment>
    <div className="example short">Not logged in? Try using admin/admin or fake/fake</div>
    <div className="example">
      <Login userContext={mutableUser} />
    </div>

    <div className="example">
      <Logout userContext={mutableUser} />
    </div>

    <div className="example">
      <RequiresPermission userContext={authorizedUser} permissions={['user']}>
        <div>
            Some authorized content goes here!
        </div>
      </RequiresPermission>

      <RequiresPermission userContext={notLoggedInUser} permissions={['user']}>
        <div>
            Hidden content here is never rendered
        </div>
      </RequiresPermission>

      <RequiresPermission userContext={unauthorizedUser} permissions={['user']}>
        <div>
            Some authorized content goes here!
        </div>
        <NotAuthorized>
          <div>
              Permission denied!
          </div>
        </NotAuthorized>
      </RequiresPermission>
    </div>

    <div className="example">
      <AuthGuard userContext={mutableUser}>
        <p>
            Logged in content! <Logout userContext={mutableUser} />
        </p>
        <p>
            But below is are sections with different permission requirements!
        </p>
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
