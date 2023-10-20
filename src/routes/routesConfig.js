import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import RegistroCitas from '../screens/RegistroCitas/RegistroCitas';
import Seguimiento from '../screens/Seguimiento/Seguimiento';
import Turnos from '../screens/Turnos/Turnos';
import HistorialAtenciones from '../screens/HistorialAtenciones/HistorialAtenciones';

const routesConfig = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: true,
  },
  {
    path: '/seguimiento',
    component: Seguimiento,
    isPrivate: true,
  },
  {
    path: '/turnos',
    component: Turnos,
    isPrivate: true,
  },
  {
    path: '/registrar-citas',
    component: RegistroCitas,
    isPrivate: true,
  },
  {
    path: '/historial-atenciones',
    component: HistorialAtenciones,
    isPrivate: true,
  },
];

export default routesConfig;
