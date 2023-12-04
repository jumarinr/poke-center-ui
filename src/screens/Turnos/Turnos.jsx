import React, { useState, useEffect, useMemo } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { getProximosTurnos } from './helpers';

import TurnoActual from './TurnoActual';
import ListadoTurnos from './ListadoTurnos';
import { leerAtenciones } from '../../http/llamados';

const Turnos = () => {
  const [citas, setCitas] = useState([]);

  const citasRestantes = useMemo(() => getProximosTurnos(citas), [citas]);

  useEffect(() => {
    const checkCitasData = async () => {
      const request = await leerAtenciones(false);

      setCitas(request.data || []);
    };

    window.addEventListener('storage', checkCitasData);

    checkCitasData();
    return () => {
      window.removeEventListener('storage', checkCitasData);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className="text-center">
          <b>Por favor espera tu turno, pronto todos serán atendidos...</b>
        </div>
      </Grid>

      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6} className="mr-2">
            <TurnoActual turno={citas[0]} />
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6}>
            <b>Próximos turnos:</b>
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6}>
            <ListadoTurnos turnos={citasRestantes} />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

Turnos.propTypes = {};

export default Turnos;
