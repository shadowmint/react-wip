/** Extend this class with a concrete implementation */
export class AuthService {
  /** Return a promise for the user object */
  login(username, password) {
    return Promise.reject(new Error('Not implemented'));
  }

  /** Check if a user has the required permissions */
  userHasPermissions(user, permissions) {
    if (!permissions) return false;
    if (user == null) return false;
    const missingPermissions = permissions.filter(p => !user.permissions.find(i => i === p));
    return missingPermissions.length === 0;
  }
}
