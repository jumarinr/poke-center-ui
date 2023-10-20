import React, { useEffect, useState } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { parseCitas } from '../Turnos/helpers';
import ListadoTurnos from '../Turnos/ListadoTurnos';

const HistorialAtenciones = () => {
  const [citas, setCitas] = useState(parseCitas(localStorage.getItem('atenciones')));

  useEffect(() => {
    const checkCitasData = () => {
      const item = localStorage.getItem('atenciones');

      const itemParsed = parseCitas(item);
      setCitas(itemParsed);
    };

    window.addEventListener('storage', checkCitasData);

    return () => {
      window.removeEventListener('storage', checkCitasData);
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="text-center">
          <h4>Historial Atenciones</h4>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="d-flex justify-content-center">

          <Grid item xs={12} md={6.5}>
            <ListadoTurnos turnos={citas} isFromHistorial />
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  );
};

HistorialAtenciones.propTypes = {};

export default HistorialAtenciones;
