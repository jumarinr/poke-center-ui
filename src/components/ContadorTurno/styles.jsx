import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '8px', // Bordes redondeados
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%', // Establece el alto al 100% para ocupar toda la altura de la pantalla
  },
  contador: {
    fontFamily: '\'Press Start 2P\', sans-serif',
    fontSize: '4rem', // Tamaño de fuente más grande
    letterSpacing: '2px', // Espaciado entre caracteres
    color: '#FF3D00', // Color rojo asociado con Pokémon
    textShadow: '2px 2px 4px #000',
  },
  pokeball: {
    fontSize: '5rem',
    color: '#FF3D00', // Color rojo de la Pokéball
  },
}));

export default useStyles;
