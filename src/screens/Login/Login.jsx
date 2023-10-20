import React from 'react';

// material ui core
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// material ui icons

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formValues = {
      email: data.get('email'),
      password: data.get('password'),
    };

    localStorage.setItem('tokenUser', '123');
    window.dispatchEvent(new Event('storage'));

    return formValues;
  };

  return (
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
              <Grid item xs>
                <Link href="local" variant="body2">
                  ¿Olvidó su contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="local" variant="body2">
                  Contactar administrador para credenciales
                </Link>
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
  );
};

export default Login;
