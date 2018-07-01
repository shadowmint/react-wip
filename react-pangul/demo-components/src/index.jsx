import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserDemo } from './pages/userDemo';
import { LayoutDemo } from './pages/layoutDemo';
import { AuthDemo } from './pages/authDemo';
import './index.scss';

const App = () => (
  <div>
    <nav>
      <Link to="/layoutDemo">Layout Demo</Link>
      <Link to="/userDemo">User Demo</Link>
      <Link to="/authDemo">Auth Demo</Link>
    </nav>
    <div>
      <Route path="/layoutDemo" exact component={LayoutDemo} />
      <Route path="/userDemo" exact component={UserDemo} />
      <Route path="/authDemo" exact component={AuthDemo} />
    </div>
  </div>
);

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'),
);
