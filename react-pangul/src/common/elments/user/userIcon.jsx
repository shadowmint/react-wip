import React from 'react';
import PropTypes from 'prop-types';
import './userIcon.scss';
import defaultUserIcon from './defaultUserIcon.png';

export default function UserIcon(props) {
  return (
    <div className="component--UserIcon" style={{ width: props.size, height: props.size }}>
      <img
        alt={props.username}
        title={props.username}
        src={props.icon}
      />
    </div>
  );
}

UserIcon.propTypes = {
  // The public username of the user
  username: PropTypes.string.isRequired,

  // The size of the icon to show
  size: PropTypes.string.isRequired,

  // The icon to display for the user
  icon: PropTypes.string,
};


UserIcon.defaultProps = {
  icon: defaultUserIcon,
};
