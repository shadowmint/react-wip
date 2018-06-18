import {Layout} from '../../src/pangul/layout';
import React from 'react';
import ReactDOM from 'react-dom';

export class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Layout/>;
  }
}


ReactDOM.render(
  <div>
    <Demo/>
  </div>,
  document.getElementById('root')
)
