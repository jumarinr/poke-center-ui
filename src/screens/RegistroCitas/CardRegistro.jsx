import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// material ui icons
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MedicationIcon from '@mui/icons-material/Medication';

import { searchPokemon } from './helpers';

const CardRegistro = ({ setPokemonInfo, setAlert }) => {
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleSearchPokemon = async () => {
    setIsLoadingData(true);
    try {
      const data = await searchPokemon(pokemonSearch);
      setPokemonInfo(data);
    } catch (error) {
      setAlert({
        message: error.message,
        isOpen: true,
      });
      setPokemonInfo(null);
    } finally {
      setIsLoadingData(false);
    }
  };

  const onNameChange = ({ target }) => setPokemonSearch(target.value);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="pokemonInput">
            Ingrese el nombre de su Pokémon
          </InputLabel>
          <OutlinedInput
            id="pokemonInput"
            type="text"
            required
            onChange={onNameChange}
            value={pokemonSearch}
            name="pokemonInput"
            endAdornment={(
              <InputAdornment position="end">
                {isLoadingData
                  ? <CircularProgress size={25} />
                  : (
                    <IconButton
                      onClick={handleSearchPokemon}
                      edge="end"
                      color="primary"
                      type="submit"
                    >
                      <TravelExploreIcon />
                    </IconButton>
                  )}

              </InputAdornment>
            )}
            label="Ingrese el nombre de su Pokémon"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <div className="d-flex justify-content-end">
          <Button
            size="medium"
            variant="contained"
            color="info"
            endIcon={<MedicationIcon />}
          >
            Guardar turno
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

CardRegistro.propTypes = {
  setPokemonInfo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default CardRegistro;
