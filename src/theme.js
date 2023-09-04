import { createTheme } from '@mui/material/styles';

const fonts = 'Rubik';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0ef', //  '#394764',
    },
    primary: {
      main: '#ff742e',
      contrastText: '#fff', // button text white instead of black
    },
    secondary: {
      main: '#f0f0ef',
      contrastText: '#394764', // button text white instead of black
    },
    info: {
      main: '#394764',
      contrastText: '#f0f0ef', // button text white instead of black
    },
  },

  typography: {
    fontFamily: fonts,
    button: {
      textTransform: 'none',
    },
  },

  components: {
    MuiDivider: {
      styleOverrides: {
        light: {
          background: '#394764',
        },
      },
    },
  },

});

export default theme;
