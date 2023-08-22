import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';

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
];

export default routesConfig;
