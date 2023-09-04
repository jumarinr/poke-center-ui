import { useNavigate } from 'react-router-dom';

import React from 'react';

// material ui core
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// material ui icons
import LogoutIcon from '@mui/icons-material/Logout';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SickIcon from '@mui/icons-material/Sick';

const NavigationBar = () => {
  const navigate = useNavigate();

  const onCloseSession = () => {
    localStorage.removeItem('tokenUser');
    window.dispatchEvent(new Event('storage'));
  };

  const onRedirect = (route) => () => navigate(route);

  return (
    <AppBar position="static" component="nav">
      <Toolbar variant="dense" sx={{ ml: 1, mr: 1, p: 0 }}>

        <Box>
          <img alt="PokeSura logo" src="/pokeSuraIcon.png" width={50} />
        </Box>

        <Box sx={{ flexGrow: { xs: 0, sm: 1, md: 1 } }} />

        <Box
          sx={{
            '& button': { m: 1 },
            flexGrow: { xs: 1, sm: 0, md: 0 },
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={onRedirect('/')}
            size="small"
            endIcon={<VaccinesIcon color="primary" />}
          >
            Inicio
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={onRedirect('/registrar-citas')}
            size="small"
            endIcon={<SickIcon color="primary" />}
            sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
          >
            Registrar Pokémon
          </Button>

          <Button
            color="secondary"
            variant="contained"
            onClick={onRedirect('/seguimiento')}
            size="small"
            endIcon={<VaccinesIcon color="primary" />}
            sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
          >
            Seguimiento pacientes
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={onRedirect('/turnos')}
            size="small"
            endIcon={<MedicalServicesIcon color="primary" />}
            sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
          >
            Turnos
          </Button>

          <Tooltip title="Cerrar sesión">
            <IconButton
              size="small"
              color="inherit"
              aria-label="menu"
              onClick={onCloseSession}
              sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>

        </Box>

      </Toolbar>
    </AppBar>
  );
};

NavigationBar.propTypes = {};

export default NavigationBar;
