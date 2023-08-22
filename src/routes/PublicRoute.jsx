/* eslint-disable react/jsx-props-no-spreading */

import { Navigate } from 'react-router-dom';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PublicComponent = ({ component: Component, ...restOfProps }) => {
  const [userInfo] = useState(false);

  return userInfo
    ? <Navigate to="/" replace />
    : <Component {...restOfProps} />;
};

PublicComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicComponent;
