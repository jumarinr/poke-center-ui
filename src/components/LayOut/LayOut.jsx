/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const LayOut = ({ children }) => (
  <>
    <div>LayOut</div>
    <div>
      {children}
    </div>
  </>
);

LayOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayOut;
