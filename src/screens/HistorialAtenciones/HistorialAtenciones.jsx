import _ from 'lodash';

import React, { useEffect, useState } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { parseCitas } from '../Turnos/helpers';

import ListadoTurnos from '../Turnos/ListadoTurnos';

const sortCitas = (citas) => _.orderBy(citas, 'fechaAtencion', 'desc');

const HistorialAtenciones = () => {
  const [citas, setCitas] = useState(sortCitas(parseCitas(localStorage.getItem('atenciones'))));

  useEffect(() => {
    const checkCitasData = () => {
      const item = localStorage.getItem('atenciones');

      const itemParsed = parseCitas(item);
      setCitas(sortCitas(itemParsed));
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
