import axios from 'axios';

export const a = 1;

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
