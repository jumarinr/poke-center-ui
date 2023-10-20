import _ from 'lodash';

import React, { useState, useMemo } from 'react';

// material ui core
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import MedicationIcon from '@mui/icons-material/Medication';

import CardRegistro from './CardRegistro';
import CardInfoPokemon from './CardInfoPokemon';
import ContadorTurno from '../../components/ContadorTurno/ContadorTurno';

const DEFAULT_FORM_VALUES = {
  hp: 0,
  trainerName: '',
  trainerId: '',
  cambioEstado: null,
  nivel: 0,
};

const RegistroCitas = () => {
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [hasSendTurn, setHasSendTurn] = useState(false);
  const [turnNumber, setTurnNumber] = useState(0);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  const [alert, setAlert] = useState({
    message: null,
    isOpen: false,
    type: 'error',
  });

  const handleOpenAlert = () => setAlert((prev) => ({
    ...prev,
    isOpen: !prev.isOpen,
  }));

  const handleChangeForm = ({ target }) => setFormValues((prev) => ({
    ...prev,
    [target.name]: target.value,
  }));

  const isTherePokemonInfo = useMemo(() => !!pokemonInfo, [pokemonInfo]);

  const handleSubmit = () => {
    try {
      const citas = JSON.parse(localStorage.getItem('citas')) || [];

      citas.push({
        ...formValues,
        createdAt: new Date(),
        pokemonId: pokemonInfo.id,
        pokemonInfo: _.pick(pokemonInfo, ['sprites', 'name', 'id', 'stats']),
        turnNumber: citas?.length ? citas.length + 1 : 1,
        id: Date.now(),
      });

      localStorage.setItem('citas', JSON.stringify(citas));
      window.dispatchEvent(new Event('storage'));

      setAlert({
        isOpen: true,
        message: 'Turno asignado con éxito!',
        type: 'success',
      });

      setHasSendTurn(true);
      setFormValues(DEFAULT_FORM_VALUES);
      setPokemonInfo(null);
      setTurnNumber(citas.length);
    } catch (error) {
      setAlert({
        isOpen: true,
        message: error.message,
        type: 'error',
      });
      setTurnNumber(0);
    }
  };

  const regresarTurno = () => {
    setHasSendTurn(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container className="d-flex justify-content-center">
            <Grid item xs={12} md={6} className="mr-2">

              <Card>
                <CardContent>
                  {!hasSendTurn
                    ? (
                      <>
                        <Typography variant="h3" gutterBottom className="text-center">
                          <b>Registro de turno de Pokémon</b>
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={isTherePokemonInfo ? 6 : 12}>

                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <CardRegistro
                                  setAlert={setAlert}
                                  setPokemonInfo={setPokemonInfo}
                                  formValues={formValues}
                                  handleChangeForm={handleChangeForm}
                                  pokemonInfo={pokemonInfo}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <div className="d-flex justify-content-end mt=5">
                                  <Button
                                    size="medium"
                                    variant="contained"
                                    color="info"
                                    onClick={handleSubmit}
                                    endIcon={<MedicationIcon />}
                                  >
                                    Guardar turno
                                  </Button>
                                </div>
                              </Grid>
                            </Grid>

                          </Grid>

                          {isTherePokemonInfo
                            ? (
                              <Grid item xs={12} md={6}>
                                <div style={{ height: '80' }}>
                                  <CardInfoPokemon
                                    pokemonInfo={pokemonInfo}
                                    formValues={formValues}
                                  />
                                </div>
                              </Grid>
                            )
                            : null}

                        </Grid>
                      </>
                    )

                    : (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography variant="h3" gutterBottom className="text-center">
                            <b>Tu turno es:</b>
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container className="d-flex justify-content-center">
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                              <ContadorTurno numeroTurno={turnNumber} />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="d-flex justify-content-center">
                            <Button
                              onClick={regresarTurno}
                              size="medium"
                              variant="contained"
                              color="info"
                            >
                              Tomar otro turno
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

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
RegistroCitas.propTypes = {};

export default RegistroCitas;
