import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';

import HealingIcon from '@mui/icons-material/Healing';
import useStyles from './styles';

const ContadorTurno = ({ numeroTurno }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.contadorContainer}>
        <HealingIcon className={classes.pokeball} fontSize="50" />
        <div className={classes.contador}>{`N-${numeroTurno}`}</div>
      </div>
    </Paper>
  );
};

ContadorTurno.defaultProps = {
  numeroTurno: 15,
};

ContadorTurno.propTypes = {
  numeroTurno: PropTypes.number,
};

export default ContadorTurno;
