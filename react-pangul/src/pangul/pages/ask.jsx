import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Loadable from 'react-loadable';
import {Loading} from "../components/display/loading";

export class TemplateProp {
}


export class Ask extends React.Component {
  render() {
    const Loader = Loadable({
      loader: () => import('./components/askPage'),
      render(loaded, props) {
        let Component = loaded.AskPage;
        return <Component id={1}/>;
      },
      loading: Loading,
    });
    return <Loader/>;
  }
}
