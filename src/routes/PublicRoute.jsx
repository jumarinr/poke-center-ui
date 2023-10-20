/* eslint-disable react/jsx-props-no-spreading */

import { Navigate } from 'react-router-dom';

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ContextUser from '../contexts/ContextUser';

const PublicComponent = ({ component: Component, ...restOfProps }) => {
  const { tokenUser } = useContext(ContextUser);

  return tokenUser
    ? <Navigate to="/" replace />
    : <Component {...restOfProps} />;
};

PublicComponent.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicComponent;
