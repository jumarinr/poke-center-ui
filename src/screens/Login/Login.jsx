import React, { useState } from 'react';

// material ui core
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { onLogin } from '../../http/llamados';

// material ui icons

const Login = () => {
  const [alert, setAlert] = useState({
    message: null,
    isOpen: false,
    type: 'error',
  });

  const handleOpenAlert = () => setAlert((prev) => ({
    ...prev,
    isOpen: !prev.isOpen,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formValues = {
      username: data.get('email'),
      password: data.get('password'),
    };

    const result = await onLogin(formValues);

    if (result.error) {
      setAlert({
        isOpen: true,
        message: result.error,
        type: 'error',
      });

      return;
    }

    localStorage.setItem('tokenUser', result.data);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <Grid container className="d-flex justify-content-center mt-5">
        <Grid item xs={10} sm={6} md={5} lg={3}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img alt="PokeCenter icon" src="/pokeCenter.png" width="50%" />
              <Typography component="h1" variant="h5">
                Inicio de sesión
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Correo electrónico"
                  name="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                  color="primary"
                >
                  Iniciar sesión
                </Button>
              </form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="text-center">
                    <Link href="mailto:jumarinr@unal.edu.co?Subject=Credenciales PokéSura" variant="body2" target="_blank" rel="noopener" noreferrer>
                      Contactar administrador para credenciales
                    </Link>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {`Derechos reservados © PokéSura ${new Date().getFullYear()}.`}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
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

export default Login;
