import './App.css';

import React, { useState, useMemo, useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';

import RoutesDetails from './routes/RoutesDetails';
import theme from './theme';
import ContextUser from './contexts/ContextUser';

const App = () => {
  const [tokenUser, setTokenUser] = useState(localStorage.getItem('tokenUser'));

  const dataContext = useMemo(() => ({
    tokenUser,
    setTokenUser,
  }), [tokenUser, setTokenUser]);

  useEffect(() => {
    const checkUserData = () => {
      const item = localStorage.getItem('tokenUser');
      setTokenUser(item);
    };

    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  return (
    <ContextUser.Provider value={dataContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesDetails />
      </ThemeProvider>
    </ContextUser.Provider>
  );
};

export default App;
