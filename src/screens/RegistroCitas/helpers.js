import _ from 'lodash';

import axios from 'axios';

import fullSchema from './validations';

export const searchPokemon = async (nombrePokemon) => {
  if (!nombrePokemon) {
    throw new Error('Debe ingresar el nombre o el id del Pokémon');
  }

  try {
    const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);

    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Pokémon no encontrado, intenta con otro nombre o revisa la ortografia.');
  }
};

export const validarData = ({ formValues, stats }) => {
  const hpStat = _.find(stats, (stat) => stat.stat.name === 'hp');

  const maxHP = hpStat?.base_stat || 1000;

  const { error } = fullSchema({ maxHP }).validate(formValues, {
    abortEarly: true,
  });

  return error;
};
