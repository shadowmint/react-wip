import React from 'react';
import LiveSearch from '../../../src/search/liveSearch';

export class SearchDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchHandler = {};
  }

  render() {
    return (
      <div>
        <div className="example">
          <LiveSearch loading={false} />
        </div>
        <div className="example">
          <LiveSearch loading/>
        </div>
      </div>
    );
  }
}
