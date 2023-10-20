import React, { useEffect, useMemo, useState } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { getProximosTurnos, parseCitas } from '../Turnos/helpers';

import TurnoActual from '../Turnos/TurnoActual';
import ListadoTurnos from '../Turnos/ListadoTurnos';
// import PropTypes from 'prop-types'

const IS_FROM_SEGUIMIENTO = true;

const Seguimiento = () => {
  const [citas, setCitas] = useState(parseCitas(localStorage.getItem('citas')));

  const citasRestantes = useMemo(() => getProximosTurnos(citas, IS_FROM_SEGUIMIENTO), [citas]);

  useEffect(() => {
    const checkCitasData = () => {
      const item = localStorage.getItem('citas');

      const itemParsed = parseCitas(item);
      setCitas(itemParsed);
    };

    window.addEventListener('storage', checkCitasData);

    return () => {
      window.removeEventListener('storage', checkCitasData);
    };
  }, []);

  console.log(citasRestantes);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className="text-center">
          <b>Seleccione el pokémon que desea que empiece a ser atendido</b>
        </div>
      </Grid>

      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6} className="mr-2">
            <TurnoActual turno={citas[0]} isFromSeguimiento />
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6}>
            <ListadoTurnos turnos={citasRestantes} isFromSeguimiento />
          </Grid>

        </Grid>
      </Grid>

    </Grid>
  );
};

Seguimiento.propTypes = {};

export default Seguimiento;
