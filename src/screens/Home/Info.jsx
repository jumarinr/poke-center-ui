import { useNavigate } from 'react-router-dom';

import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// material ui icons
import SickIcon from '@mui/icons-material/Sick';

const Info = () => {
  const navigate = useNavigate();

  const onRedirect = (route) => () => navigate(route);

  return (
    <Card>
      <CardContent>
        <div className="text-center">
          <img alt="Chancey" src="/chansey.png" width="20%" />
          <Typography variant="h3" gutterBottom>
            <b>Centro Pokémon</b>
          </Typography>

          <Typography variant="body1" gutterBottom>
            Bienvenido al centro Pokémon, por favor registra
            a tus Pokemón heridos para ser atendidos
          </Typography>

          <Button
            size="medium"
            variant="contained"
            color="info"
            endIcon={<SickIcon />}
            onClick={onRedirect('/registrar-citas')}
          >
            Registrar Pokémon
          </Button>

        </div>
      </CardContent>

    </Card>
  );
};
Info.propTypes = {};

export default Info;
