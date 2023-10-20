import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './PokemonHealthBar.css';

const getBarColor = (healthPercentage) => {
  if (healthPercentage >= 80) {
    return 'green';
  }

  if (healthPercentage >= 45) {
    return 'orange';
  }

  return 'red';
};

const BarHP = ({ currentHP, maxHP }) => {
  const healthPercentage = useMemo(() => (currentHP / maxHP) * 100, [currentHP, maxHP]);

  const barColor = useMemo(() => getBarColor(healthPercentage), [healthPercentage]);

  return (
    <div className="pokemon-health-bar">
      <div className="health-bar-border">
        <div className="health-bar" style={{ width: `${healthPercentage || 0}%`, backgroundColor: barColor }} />
      </div>
      <div className="health-text">
        {`${currentHP} / ${maxHP} HP`}
      </div>
    </div>
  );
};

BarHP.defaultProps = {
  currentHP: 0,
  maxHP: 0,
};

BarHP.propTypes = {
  currentHP: PropTypes.number,
  maxHP: PropTypes.number,
};

export default BarHP;
