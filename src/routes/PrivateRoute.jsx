/* eslint-disable react/jsx-props-no-spreading */
import { Navigate } from 'react-router-dom';

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ContextUser from '../contexts/ContextUser';
import LayOut from '../components/LayOut/LayOut';

const PrivateComponent = ({ component: Component, ...restOfProps }) => {
  const { tokenUser } = useContext(ContextUser);

  return tokenUser
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
