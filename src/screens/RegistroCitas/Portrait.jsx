import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const Portrait = ({ imageUrl }) => {
  const frameStyle = {
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

  const portraitStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <Paper sx={frameStyle}>
      <Avatar alt="Foto del Pokémon" src={imageUrl} sx={portraitStyle} />
    </Paper>
  );
};

Portrait.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default Portrait;
