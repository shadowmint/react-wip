import {BrowserRouter, Link, Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppDemo from "./pages/appDemo";


const App = () => (
  <div>
    <nav>
      <Link to="/appDemo">App Demo</Link>
    </nav>
    <div>
      <Route path="/appDemo" component={AppDemo}/>
    </div>
  </div>
);

ReactDOM.render(
  (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  ), document.getElementById('root'),
);
