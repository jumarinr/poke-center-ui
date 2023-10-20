/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Grid from '@mui/material/Grid';

import NavigationBar from '../NavigationBar/NavigationBar';

const LayOut = ({ children }) => (
  <>
    <NavigationBar />
    <Grid container className="d-flex justify-content-center">
      <Grid item xs={11.5}>
        <div className="mt-5">
          {children}
        </div>
      </Grid>
    </Grid>

  </>
);

LayOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayOut;
