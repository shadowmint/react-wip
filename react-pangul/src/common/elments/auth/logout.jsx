import React from 'react';
import PropTypes from 'prop-types';
import {UserContext} from '../../contexts/userContext';

const LogoutLoading = () => (
  <div>
      Loading...
  </div>
);

const LogoutError = props => (
  <div className="error">
    {props.error.message}
  </div>
);

LogoutError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.events = {
      onLogoutAttempt: data => this.onLogout(data),
    };
  }

  onLogout(data) {
    this.setState({ loading: true, error: null }, async () => {
      try {
        const { authService } = this.props.userContext;
        await authService.logout(this.props.userContext);
        this.setState({
          loading: false, error: null,
        }, async () => {
          await authService.publish(this.props.userContext, null);
        });
      } catch (error) {
        this.setState({ error, loading: false });
      }
    });
    data.preventDefault();
    return false;
  }

  renderLogoutForm() {
    return (
      <div className="component--Logout">
        <button onClick={this.events.onLogoutAttempt}>Logout</button>
      </div>
    );
  }

  render() {
    return (
      <div className="component--Logout">
        {this.state.loading ? <LogoutLoading /> : this.renderLogoutForm()}
        {this.state.error ? <LogoutError error={this.state.error} /> : ''}
      </div>
    );
  }
}

Logout.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};
