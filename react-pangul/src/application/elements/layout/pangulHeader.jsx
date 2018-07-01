import React from 'react';
import './pangulHeader.scss';
import UserIcon from '../../common/elments/user/userIcon';

export default class PangulHeader extends React.Component {
  render() {
    return (
      <div className="component--PangulHeader">
        <div>
          Info
        </div>
        <div className="filler" />
        <div className="icon">
          <UserIcon />
        </div>
      </div>
    );
  }
}
