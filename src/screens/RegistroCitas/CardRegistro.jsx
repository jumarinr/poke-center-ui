import _ from 'lodash';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';

// material ui icons
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { searchPokemon } from './helpers';
import { OPTIONS_ESTADOS } from '../../constants';

const CardRegistro = (props) => {
  const {
    setPokemonInfo, setAlert, formValues, handleChangeForm, pokemonInfo,
  } = props;

  const { stats } = pokemonInfo || {};

  const hpStat = useMemo(() => _.find(stats, (stat) => stat.stat.name === 'hp'), [stats]);

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

      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          id="trainerName"
          label="Nombre Entrenador"
          variant="outlined"
          name="trainerName"
          value={formValues.trainerName}
          onChange={handleChangeForm}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          id="trainerId"
          label="Id Entrenador"
          variant="outlined"
          name="trainerId"
          value={formValues.trainerId}
          onChange={handleChangeForm}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="pokemonInput">
            Ingrese su Pokémon
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

      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="hp">Puntos de salud</InputLabel>
          <OutlinedInput
            id="hp"
            value={formValues.hp}
            name="hp"
            type="number"
            onChange={({ target }) => handleChangeForm({
              target: {
                name: target.name,
                value: parseInt(target.value, 10),
              },
            })}
            endAdornment={(
              <InputAdornment position="end">
                {`/ ${hpStat?.base_stat || 0} HP`}
              </InputAdornment>
            )}
            label="Puntos de salud"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={12}>
        <Autocomplete
          id="country-select-demo"
          fullWidth
          options={OPTIONS_ESTADOS}
          autoHighlight
          value={formValues.cambioEstado}
          onChange={(_event, value) => handleChangeForm({
            target: {
              name: 'cambioEstado',
              value,
            },
          })}
          getOptionLabel={(option) => option.label}
          renderOption={(propsSelect, option) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...propsSelect}>
              <img
                loading="lazy"
                width="50"
                src={option.imgSrc}
                alt="foto estado"
              />
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Seleccione un estado"
              inputProps={{
                ...params.inputProps,
              }}
              value={formValues.cambioEstado}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="nivel">Puntos de combate</InputLabel>
          <OutlinedInput
            id="nivel"
            value={formValues.nivel}
            name="nivel"
            type="number"
            onChange={({ target }) => handleChangeForm({
              target: {
                name: target.name,
                value: parseInt(target.value, 10),
              },
            })}
            endAdornment={(
              <InputAdornment position="end">
                CP
              </InputAdornment>
            )}
            label="Puntos de combate"
          />
        </FormControl>
      </Grid>

    </Grid>
  );
};

CardRegistro.defaultProps = {
  pokemonInfo: null,
};

CardRegistro.propTypes = {
  setPokemonInfo: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pokemonInfo: PropTypes.object,
  handleChangeForm: PropTypes.func.isRequired,
};

export default CardRegistro;
