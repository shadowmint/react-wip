import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Loadable from 'react-loadable';

export class TemplateProp {
}

const Loading = () => {
  return <div>Loading</div>;
};

const LoadableComponent = Loadable({
  loader: () => import('./home'),
  loading: Loading,
});

export class HomeLoadable extends React.Component {
  render() {
    return <LoadableComponent/>;
  }
}
