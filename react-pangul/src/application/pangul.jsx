import React from 'react';
import Spinner from 'react-qa/src/glyphs/spinner';
import { PangulLayout } from './pangulLayout';
import { PangulAuthService } from './services/pangulAuthService';
import { PangulLogger } from './services/pangulLogger';
import { UserContext } from '../common/contexts/userContext';
import AuthGuard from '../common/elments/auth/authGuard';
import { PangulApiService } from './services/pangulApiService';
import './pangul.scss';

export default class Pangul extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new PangulLogger();
    this.api = new PangulApiService(this.logger);
    this.state = {
      config: null,
      userContext: new UserContext(
        new PangulAuthService(this.api),
        new PangulLogger(),
      ),
    };

    this.loadUser().then(config => this.setState({ config }));
  }

  async loadUser() {
    // Load the config file
    const config = await this.api.assets.config();
    this.api.configure(config);

    // Load the current user, if any
    const user = await this.api.auth.user();
    if (user) {
      this.state.userContext.authService.publish(this.state.userContext, user);
    }

    // Update UI
    await this.sleep(300);
    return config;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  renderLoading() {
    return (
      <div className="loading">
        <Spinner size={32} />
      </div>
    );
  }

  renderContent() {
    return (
      <AuthGuard userContext={this.state.userContext}>
        <PangulLayout />
      </AuthGuard>
    );
  }

  render() {
    return (
      <div className="component--Pangul">
        {this.state.config ? this.renderContent() : this.renderLoading()}
      </div>
    );
  }
}
