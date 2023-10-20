import _ from 'lodash';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// material ui icons
import HealingIcon from '@mui/icons-material/Healing';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { parseCitas } from './helpers';

import useStyles from '../../components/ContadorTurno/styles';
import InfoTurnoPokemon from './InfoTurnoPokemon';

const TurnoActual = ({ turno, isFromSeguimiento }) => {
  const classes = useStyles();

  const [comment, setComment] = useState('');

  const [alert, setAlert] = useState({
    message: null,
    isOpen: false,
    type: 'error',
  });

  useEffect(() => {
    if (turno) {
      setComment('');
    }
  }, [turno]);

  const atenderPokemon = () => {
    const citas = parseCitas(localStorage.getItem('citas'));

    const currentIndex = _.findIndex(citas, { id: turno.id });

    citas.splice(currentIndex, 1, {
      ...turno,
      estado: 'atender',
    });

    localStorage.setItem('citas', JSON.stringify(citas));
    window.dispatchEvent(new Event('storage'));
  };

  const handleOpenAlert = () => setAlert((prev) => ({
    ...prev,
    isOpen: !prev.isOpen,
  }));

  const curarPokemon = () => {
    const citas = parseCitas(localStorage.getItem('citas'));
    const atenciones = parseCitas(localStorage.getItem('atenciones'));

    atenciones.push({
      ...turno,
      comment,
      fechaAtencion: Date.now(),
    });

    const indexCitas = _.findIndex(citas, { id: turno.id });

    citas.splice(indexCitas, 1);

    localStorage.setItem('citas', JSON.stringify(citas));
    localStorage.setItem('atenciones', JSON.stringify(atenciones));
    window.dispatchEvent(new Event('storage'));

    setAlert({
      isOpen: true,
      message: 'Pokémon curado con éxito!',
      type: 'success',
    });
    setComment('');
  };

  const bajarPrioridad = () => {
    const citas = parseCitas(localStorage.getItem('citas'));

    const lastCita = _.last(citas);

    try {
      if (lastCita.id === turno.id) {
        setAlert({
          isOpen: true,
          message: 'No puede bajar más la prioridad',
          type: 'error',
        });

        return;
      }

      const nextTurn = citas[1];

      citas.splice(1, 1, {
        ...turno,
        turnNumber: nextTurn?.turnNumber,
      });

      citas.splice(0, 1, {
        ...nextTurn,
        turnNumber: turno?.turnNumber,
      });

      localStorage.setItem('citas', JSON.stringify(citas));
      window.dispatchEvent(new Event('storage'));

      setAlert({
        isOpen: true,
        message: 'Prioridad cambiada con éxito',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!turno || (turno.estado !== 'atender' && !isFromSeguimiento)) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            <b>
              {!turno
                ? 'No hay turnos actualmente asignados'
                : 'Las Chansey y los profesionales están escogiendo el proximo pokemon en ser atendido!'}
            </b>

            <div>
              <img alt="Chancey" src="/chanseyLoading.png" width="30%" />
            </div>
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h4>
          <b>Turno Actual: </b>
          {turno.turnNumber}
        </h4>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <b>Entrenador: </b>
          {`${turno.trainerId} - ${turno.trainerName}`}
        </h5>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="text-center">
            <HealingIcon className={classes.pokeball} fontSize="50" />
            <div className={classes.contador}>{`N-${turno.turnNumber}`}</div>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoTurnoPokemon
              formValues={turno}
              pokemonInfo={turno.pokemonInfo}
            />
          </Grid>

          {isFromSeguimiento && turno.estado === 'atender'
            ? (
              <Grid item xs={12}>
                <TextField
                  id="comment"
                  label="Recomendaciones"
                  placeholder="Ingrese sus recomendaciones al entrenador para su Pokémon"
                  multiline
                  onChange={({ target }) => setComment(target.value)}
                  value={comment}
                  fullWidth
                />
              </Grid>
            )
            : null}

          <Grid item xs={12}>
            {!isFromSeguimiento
              ? <h5>Por favor acercarse para atender a su Pokémon</h5>
              : (
                <div className="d-flex justify-content-end gap-3">
                  {turno.estado !== 'atender'
                    ? (
                      <>
                        <Button
                          onClick={bajarPrioridad}
                          color="error"
                          variant="contained"
                          endIcon={<ArrowDownwardIcon />}
                        >
                          Bajar Prioridad
                        </Button>

                        <Button
                          onClick={atenderPokemon}
                          color="primary"
                          variant="contained"
                        >
                          Atender
                        </Button>
                      </>
                    )

                    : (
                      <Button
                        onClick={curarPokemon}
                        color="success"
                        variant="contained"
                      >
                        Curar
                      </Button>
                    )}

                </div>
              )}

          </Grid>
        </Grid>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={alert.isOpen}
        autoHideDuration={6000}
        onClose={handleOpenAlert}
      >
        <Alert onClose={handleOpenAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

TurnoActual.defaultProps = {
  turno: null,
  isFromSeguimiento: false,
};

TurnoActual.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  turno: PropTypes.object,
  isFromSeguimiento: PropTypes.bool,
};

export default TurnoActual;
