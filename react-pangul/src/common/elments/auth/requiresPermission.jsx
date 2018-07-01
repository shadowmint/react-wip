import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';
import NotAuthorized from './notAuthorized';

function hasPermissionForRestrictedContent(user, permissions, authService, logService) {
  try {
    console.log(user);
    console.log(permissions);
    return authService.userHasPermissions(user, permissions);
  } catch (error) {
    logService.error(error);
    return false;
  }
}

export default function RequiresPermission(props) {
  const hasPermission = hasPermissionForRestrictedContent(
    props.userContext.user,
    props.permissions,
    props.userContext.authService,
    props.userContext.logger,
  );
  const children = React.Children.map(props.children, child => child, null) || [];
  const content = children.filter(i => i.type !== NotAuthorized);
  const fallback = children.filter(i => i.type === NotAuthorized);
  console.log("Rendering", hasPermission, content, fallback);
  return (
    <React.Fragment>
      {hasPermission ? content : fallback}
    </React.Fragment>
  );
}

RequiresPermission.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // The set permissions the user requires to see this content
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Content to render if the user does have permission
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequiresPermission.defaultProps = {
  children: null,
};
