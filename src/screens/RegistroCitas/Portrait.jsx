import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const FRAME_STYLE = {
  width: 300,
  height: 300,
  border: '10px solid #394764',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const PORTRAIT_STYLE = {
  width: '100%',
  height: '100%',
};

const Portrait = ({ imageUrl }) => (
  <Paper sx={FRAME_STYLE}>
    <Avatar alt="Foto del Pokémon" src={imageUrl} sx={PORTRAIT_STYLE} />
  </Paper>
);

Portrait.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Portrait;
