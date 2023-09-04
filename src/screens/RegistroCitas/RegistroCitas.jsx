import React, { useState, useMemo } from 'react';

// material ui core
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import CardRegistro from './CardRegistro';
import CardInfoPokemon from './CardInfoPokemon';

const RegistroCitas = () => {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const [alert, setAlert] = useState({
    message: null,
    isOpen: false,
  });

  const handleOpenAlert = () => setAlert((prev) => ({
    ...prev,
    isOpen: !prev.isOpen,
  }));

  const isTherePokemonInfo = useMemo(() => !!pokemonInfo, [pokemonInfo]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container className="d-flex justify-content-center">
            <Grid item xs={12} md={6} className="mr-2">

              <Card>
                <CardContent>
                  <Typography variant="h3" gutterBottom className="text-center">
                    <b>Registro de cita de Pokémon</b>
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={isTherePokemonInfo ? 6 : 12}>
                      <CardRegistro
                        setAlert={setAlert}
                        setPokemonInfo={setPokemonInfo}
                      />
                    </Grid>

                    {isTherePokemonInfo
                      ? (
                        <Grid item xs={12} md={6}>
                          <CardInfoPokemon pokemonInfo={pokemonInfo} />
                        </Grid>
                      )
                      : null}

                  </Grid>
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
        <Alert onClose={handleOpenAlert} severity="error" sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};
RegistroCitas.propTypes = {};

export default RegistroCitas;
