import React from 'react';
import PropTypes from 'prop-types';

export class Deferred extends React.Component {
  render() {
    if (this.props.error) {
      return this.renderError();
    }
    return <React.Fragment>
      {this.props.resolved ? this.props.children : this.renderLoading()}
    </React.Fragment>;
  }

  renderLoading() {
    return <div>...</div>;
  }

  renderError() {
    return <div className="error">{this.props.error}</div>;
  }
}

Deferred.propTypes = {
  children: PropTypes.node.isRequired,
  resolved: PropTypes.bool.isRequired,
  error: PropTypes.string
};