import { createContext } from 'react';

const value = {
  tokenUser: null,
  setTokenUser: () => null,
};

const ContextUser = createContext(value);

export default ContextUser;
