import _ from 'lodash';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import React, { Suspense } from 'react';

import PaginaSuspendida from '../components/PaginaSuspendida/PaginaSuspendida';
import PrivateComponent from './PrivateRoute';
import PublicComponent from './PublicRoute';
import routesConfig from './routesConfig';

const privateRoutes = _.filter(routesConfig, { isPrivate: true });
const publicRoutes = _.filter(routesConfig, { isPrivate: false });

const RoutesDetails = () => (
  <BrowserRouter>
    <Suspense fallback={<PaginaSuspendida />}>
      <Routes>
        {publicRoutes
          .map((route) => (
            <Route
              path={route.path}
              element={<PublicComponent component={route.component} />}
              key={route.path}
            />
          ))}

        {privateRoutes
          .map((route) => (
            <Route
              path={route.path}
              element={<PrivateComponent component={route.component} />}
              key={route.path}
            />
          ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

RoutesDetails.propTypes = {};

export default RoutesDetails;
