import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../model/user';
import { AuthService } from '../../services/authService';
import { Logger } from '../../services/logger';
import RequiresPermission from './requiresPermission';
import Login from './login';
import { UserContext } from '../../contexts/userContext';

export class AuthGuardProp {
}

/**
 * AuthGuard is a top level component for ensuring a user is logged in,
 * and triggering a challenge response if they are not logged in.
 */
export default class AuthGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = RequiresPermission.updateUserSubscription(props.userContext, {
      onUserChanged: (user) => {
        this.setState({ user });
      },
    });
    this.events = {
      onLoggedIn: user => this.setState({ user }),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState) {
      if (prevState.userContext === nextProps.userContext) return prevState;
    }
    return RequiresPermission.updateUserSubscription(nextProps.userContext, prevState || {});
  }

  static updateUserSubscription(userContext, prevState) {
    if (prevState.subscription) {
      prevState.subscription.unsubscribe();
    }
    return {
      user: userContext.user,
      userContext,
      onUserChanged: prevState.onUserChanged,
      subscription: userContext.userStore.subscribe(prevState.onUserChanged),
    };
  }

  renderLogin() {
    return (
      <Login userContext={this.props.userContext} onLoggedIn={this.events.onLoggedIn} />
    );
  }

  renderContent() {
    return (
      <RequiresPermission
        userContext={this.props.userContext}
        permissions={[]}
      > {this.props.children}
      </RequiresPermission>
    );
  }

  render() {
    console.log("Render: AUTHGUARD");
    return (
      <React.Fragment>
        {this.state.user ? this.renderContent() : this.renderLogin()}
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }
}

AuthGuard.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,

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
