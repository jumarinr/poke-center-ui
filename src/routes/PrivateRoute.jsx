/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LayOut from '../components/LayOut/LayOut';

const PrivateComponent = ({ component: Component, ...restOfProps }) => {
  const [userInfo] = useState(false);

  return userInfo
    ? (
      <LayOut>
        <Component {...restOfProps} />
      </LayOut>
    )
    : <Navigate to="/login" replace />;
};

PrivateComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateComponent;
