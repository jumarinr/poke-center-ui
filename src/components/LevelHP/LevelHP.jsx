import React from 'react';
import PropTypes from 'prop-types';

import './Bar.css';

const LevelHP = ({ level }) => (
  <div className="pokemon-health-bar">
    <div className="health-bar-border">
      <div className="health-bar" style={{ width: `${level || 0}%` }} />
    </div>
    <div className="health-text">
      {`${level} / ${100} Nivel`}
    </div>
  </div>
);

LevelHP.defaultProps = {
  level: 0,
};

LevelHP.propTypes = {
  level: PropTypes.number,
};

export default LevelHP;
