import _ from 'lodash';

// material x core
import { DataGrid } from '@mui/x-data-grid';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { parseCitas } from './helpers';

import columnsTurnos from './columnsTurnos';

const ListadoTurnos = ({ turnos, isFromSeguimiento, isFromHistorial }) => {
  const [alert, setAlert] = useState({
    message: null,
    isOpen: false,
    type: 'error',
  });

  const handleOpenAlert = () => setAlert((prev) => ({
    ...prev,
    isOpen: !prev.isOpen,
  }));

  const bajarPrioridad = (row) => {
    const citas = parseCitas(localStorage.getItem('citas'));

    const lastCita = _.last(citas);

    try {
      if (lastCita.id === row.id) {
        setAlert({
          isOpen: true,
          message: 'No puede bajar más la prioridad',
          type: 'error',
        });

        return;
      }

      const currentIndexTurn = _.findIndex(citas, { id: row.id });

      const nextTurn = citas[currentIndexTurn + 1];

      citas.splice(currentIndexTurn + 1, 1, {
        ...row,
        turnNumber: nextTurn?.turnNumber,
      });

      citas.splice(currentIndexTurn, 1, {
        ...nextTurn,
        turnNumber: row?.turnNumber,
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

  const subirPrioridad = (row) => {
    const citas = parseCitas(localStorage.getItem('citas'));

    try {
      const currentIndexTurn = _.findIndex(citas, { id: row.id });

      const previousTurn = citas[currentIndexTurn - 1];

      citas.splice(currentIndexTurn - 1, 1, {
        ...row,
        turnNumber: previousTurn?.turnNumber,
      });

      citas.splice(currentIndexTurn, 1, {
        ...previousTurn,
        turnNumber: row?.turnNumber,
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

  if (_.isEmpty(turnos)) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            <b>No hay próximas citas hasta el momento</b>
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataGrid
        rows={turnos}
        // disableRowSelectionOnClick
        columns={columnsTurnos({
          isFromSeguimiento,
          bajarPrioridad,
          subirPrioridad,
          isFromHistorial,
        })}
        getRowId={(row) => row.id}
      />

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

    </>
  );
};

ListadoTurnos.defaultProps = {
  turnos: null,
  isFromSeguimiento: false,
  isFromHistorial: false,
};

ListadoTurnos.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  turnos: PropTypes.arrayOf(PropTypes.object),
  isFromSeguimiento: PropTypes.bool,
  isFromHistorial: PropTypes.bool,
};

export default ListadoTurnos;
