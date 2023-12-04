import _ from 'lodash';

// material x core
import { DataGrid } from '@mui/x-data-grid';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { onCambiaPrioridad } from '../../http/llamados';

import columnsTurnos from './columnsTurnos';
import { onUpdateSystem } from './helpers';

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

  const bajarPrioridad = async (row) => {
    const lastCita = _.last(turnos);

    if (lastCita.id === row.id) {
      setAlert({
        isOpen: true,
        message: 'No puede bajar más la prioridad',
        type: 'error',
      });

      return;
    }

    const datosCita = await onCambiaPrioridad({
      id: row.id,
      turn_number: row.turnNumber + 1,
    });

    if (datosCita.isError) {
      setAlert({
        isOpen: true,
        message: datosCita.error,
        type: 'error',
      });

      return;
    }

    onUpdateSystem();

    setAlert({
      isOpen: true,
      message: 'Prioridad cambiada con éxito',
      type: 'success',
    });
  };

  const subirPrioridad = async (row) => {
    const datosCita = await onCambiaPrioridad({
      id: row.id,
      turn_number: row.turnNumber - 1,
    });

    if (datosCita.isError) {
      setAlert({
        isOpen: true,
        message: datosCita.error,
        type: 'error',
      });

      return;
    }

    onUpdateSystem();

    setAlert({
      isOpen: true,
      message: 'Prioridad cambiada con éxito',
      type: 'success',
    });
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
