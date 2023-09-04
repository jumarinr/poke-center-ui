import React from 'react';
import PropTypes from 'prop-types';
import Portrait from './Portrait';

const CardInfoPokemon = ({ pokemonInfo }) => {
  const { sprites, name, id } = pokemonInfo || {};

  console.log(pokemonInfo);

  return pokemonInfo
    ? (
      <div className="d-flex justify-content-center">
        <div>
          <div className="text-center">
            <b>
              {`${name} - #${id}`}
            </b>
          </div>

          <Portrait imageUrl={sprites?.other?.['official-artwork']?.front_default} />

        </div>
      </div>
    )
    : null;
};

CardInfoPokemon.defaultProps = {
  pokemonInfo: null,
};

CardInfoPokemon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pokemonInfo: PropTypes.object,
};

export default CardInfoPokemon;
