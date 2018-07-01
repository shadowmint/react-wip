import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../model/user';
import { AuthService } from '../../services/authService';
import { Logger } from '../../services/logger';
import RequiresPermission from './requiresPermission';
import Login from './login';
import {UserContext} from '../../contexts/userContext';

export class AuthGuardProp {
}

/**
 * AuthGuard is a top level component for ensuring a user is logged in,
 * and triggering a challenge response if they are not logged in.
 */
export default class AuthGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.events = {
      onLoginAttempt: (username, password) => this.props.authService.login(username, password),
      onLoggedIn: user => this.setState({ user }),
    };
  }

  renderLogin() {
    return (
      <Login
        onLoginAttempt={this.events.onLoginAttempt}
        onLoggedIn={this.events.onLoggedIn}
      />
    );
  }

  renderContent() {
    return (
      <RequiresPermission
        user={this.state.user}
        logger={this.props.logger}
        authService={this.props.authService}
        permissions={this.props.permissions}
        fallback={this.props.fallback}
      > {this.props.children}
      </RequiresPermission>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.user ? this.renderContent() : this.renderLogin()}
      </React.Fragment>
    );
  }
}

AuthGuard.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // The fallback to use if the user has no permission
  fallback: PropTypes.node,

  // The set permissions the user requires to see this content
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Content to render if the user does have permission
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AuthGuard.defaultProps = {
  children: null,
};

/* AuthGuard.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(AuthGuardProp),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(AuthGuardProp)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // Children
  children: PropTypes.node.isRequired,
}; */
