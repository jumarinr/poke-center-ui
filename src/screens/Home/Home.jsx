import React from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import Info from './Info';

const Home = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container className="d-flex justify-content-center">
        <Grid item xs={12} md={4} className="mr-2">
          <Info />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

Home.propTypes = {};

export default Home;
