import _ from 'lodash';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Portrait from './Portrait';
import BarHP from '../../components/BarHP/BarHP';

const CardInfoPokemon = ({ pokemonInfo, formValues }) => {
  const {
    sprites, name, id, stats,
  } = pokemonInfo || {};

  const hpStat = useMemo(() => _.find(stats, (stat) => stat.stat.name === 'hp'), [stats]);

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

          <div className="mt-2">
            <BarHP maxHP={hpStat?.base_stat} currentHP={formValues?.hp} />
          </div>

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
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
};

export default CardInfoPokemon;
