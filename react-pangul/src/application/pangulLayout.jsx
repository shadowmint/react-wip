import React from 'react';
import PangulHeader from '../elements/layout/pangulHeader';
import './pangulLayout.scss';

export class PangulLayout extends React.Component {
  render() {
    return (
      <div className="component--PangulLayout">
        <PangulHeader />
        <div>
          Content goes here
        </div>
      </div>
    );
  }
}
