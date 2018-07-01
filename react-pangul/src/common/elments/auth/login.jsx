import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';

export class LoginFormProp {
}

const LoginLoading = () => (
  <div>
      Loading...
  </div>
);

const LoginError = props => (
  <div className="error">
    {props.error.message}
  </div>
);

LoginError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };
    this.events = {
      onLoginAttempt: data => this.onLogin(data),
      onChangeUsername: data => this.onChange(data, 'username'),
      onChangePassword: data => this.onChange(data, 'password'),
    };
  }

  onChange(data, key) {
    const modifier = {};
    modifier[key] = data.target.value;
    this.setState(modifier);
  }

  onLogin(data) {
    this.setState({ loading: true, error: null }, async () => {
      try {
        const { authService } = this.props.userContext;
        const user = await authService.login(this.state.username, this.state.password);
        console.log(user);
        this.setState({
          loading: false, error: null, password: '', username: '',
        }, async () => {
          console.log("Publish?");
          await authService.publish(this.props.userContext, user);
        });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    });
    data.preventDefault();
    return false;
  }

  renderLoginForm() {
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={this.events.onChangeUsername}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.events.onChangePassword}
          className="password"
        />
        <button onClick={this.events.onLoginAttempt}>Login</button>
      </div>
    );
  }

  render() {
    return (
      <div className="component--Login">
        {this.state.loading ? <LoginLoading /> : this.renderLoginForm()}
        {this.state.error ? <LoginError error={this.state.error} /> : ''}
      </div>
    );
  }
}

Login.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};
