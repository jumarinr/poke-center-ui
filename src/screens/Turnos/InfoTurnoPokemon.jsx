import _ from 'lodash';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import LevelHP from '../../components/LevelHP/LevelHP';
import BarHP from '../../components/BarHP/BarHP';

const FRAME_STYLE = {
  width: 150,
  height: 150,
  border: '10px solid #394764',
  backgroundColor: 'white',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const PORTRAIT_STYLE = {
  width: '100%',
  height: '100%',
};

const InfoTurnoPokemon = ({ pokemonInfo, formValues }) => {
  const {
    sprites, name, id, stats,
  } = pokemonInfo || {};

  const hpStat = useMemo(() => _.find(stats, (stat) => stat.stat.name === 'hp'), [stats]);

  const imageUrl = useMemo(() => sprites?.other?.['official-artwork']?.front_default, [sprites]);

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-around align-items-center gap-3">
        <div>
          <div className="text-center">
            <b>{`${name} - #${id}`}</b>
          </div>

          <Paper sx={FRAME_STYLE}>
            <Avatar alt="Foto del Pokémon" src={imageUrl} sx={PORTRAIT_STYLE} />
          </Paper>
        </div>

        <div style={{ width: '8rem' }} className="ml-2">
          {formValues.cambioEstado?.imgSrc
            ? (
              <div className="text-center mt-2">
                <img
                  loading="lazy"
                  width="80"
                  src={formValues.cambioEstado.imgSrc}
                  alt="foto estado"
                />
              </div>
            )
            : null}

          <div className="mt-2">
            <BarHP maxHP={hpStat?.base_stat} currentHP={formValues?.hp} />
          </div>

          <div className="mt-2">
            <LevelHP level={formValues?.nivel} />
          </div>

        </div>

      </div>
    </div>
  );
};

InfoTurnoPokemon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pokemonInfo: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formValues: PropTypes.object.isRequired,
};

export default InfoTurnoPokemon;
